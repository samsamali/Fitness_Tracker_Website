import express from "express";
import {
  register,
  login,
  dashboard,
  getWorkoutsByDate,
  addWorkout
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/dashboard", verifyToken, dashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);

export default router;