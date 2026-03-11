import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  workouts: [
    {
      category: String,
      workoutName: String,
      sets: Number,
      reps: Number,
      weight: Number,
      duration: Number
    }
  ]
}, { timestamps: true })
export default mongoose.model("Workout", workoutSchema);