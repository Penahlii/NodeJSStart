import express from "express";
import {
  getAllFeedbacks,
  getFeedbackById,
  getFeedbacksByUser,
  submitFeedback,
} from "../controllers/feedback.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getAllFeedbacks);

router.get("/feedback/:id", getFeedbackById);

router.post("/submit", protectRoute, submitFeedback);

router.get("/user", protectRoute, getFeedbacksByUser);

export default router;
