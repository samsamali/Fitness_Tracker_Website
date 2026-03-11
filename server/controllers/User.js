import User from "../models/user.js";
import Workout from "../models/Workout.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SignUp
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SignIn
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dashboard details
export const dashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const workouts = await Workout.find({ user: userId });

    const totalWorkouts = workouts.reduce((sum, day) => sum + day.workouts.length, 0);
    const totalCaloriesBurnt = workouts.reduce((sum, day) => {
      return sum + day.workouts.reduce((s, w) => s + (w.duration * 5), 0); // example: 5 kcal per min
    }, 0);

    const avgCaloriesBurntperWorkout = totalWorkouts ? totalCaloriesBurnt / totalWorkouts : 0;

    res.json({
      totalWorkouts,
      totalCaloriesBurnt,
      avgCaloriesBurntperWorkout,
      weeklyCalories: {
        weeks: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        caloriesBurned: [200,300,250,400,500,150,100],
      },
      pieChartData: [
        { name: "Legs", value: 40 },
        { name: "Chest", value: 30 },
        { name: "Arms", value: 30 },
      ]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get workouts by date
// Add Workout
export const addWorkout = async (req, res) => {
  try {
    const userId = req.user.id;
    let { workoutString, date } = req.body;

    if (!workoutString) {
      return res.status(400).json({ message: "Workout input is required" });
    }

    const lines = workoutString.split("\n").map(l => l.trim()).filter(l => l);
    
    // Helper to extract first number from a string
    const extractNumber = (str) => {
      const match = str.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    };

    // At least 3 lines are required (category, name, and at least sets)
    if (lines.length < 3) {
      return res.status(400).json({ message: "Invalid format. Provide at least category, name, and sets." });
    }

    const workoutObj = {
      category: lines[0].replace(/^#/, ""),  // remove leading #
      workoutName: lines[1],
      sets: extractNumber(lines[2]) || 0,
      reps: lines.length > 3 ? extractNumber(lines[3]) : 0,
      weight: lines.length > 4 ? extractNumber(lines[4]) : 0,
      duration: lines.length > 5 ? extractNumber(lines[5]) : 0,
    };

    const workoutDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    let workoutDoc = await Workout.findOne({ user: userId, date: workoutDate });
    if (!workoutDoc) {
      workoutDoc = new Workout({ user: userId, date: workoutDate, workouts: [workoutObj] });
    } else {
      workoutDoc.workouts.push(workoutObj);
    }
    await workoutDoc.save();

    res.json({ message: "Workout added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// Get workouts by date
export const getWorkoutsByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    let dateParam = req.query.date;
    console.log("getWorkoutsByDate - received date param:", dateParam);
    const date = dateParam?.split("T")[0] || new Date().toISOString().split("T")[0];
    console.log("getWorkoutsByDate - querying with date:", date);

    let workoutDoc = await Workout.findOne({ user: userId, date });
    console.log("getWorkoutsByDate - workoutDoc found:", workoutDoc ? "yes" : "no");

    if (!workoutDoc) workoutDoc = { workouts: [] };
    res.json({ todaysWorkouts: workoutDoc.workouts || [] });
  } catch (err) {
    console.error("getWorkoutsByDate error:", err);
    res.status(500).json({ message: err.message });
  }
};