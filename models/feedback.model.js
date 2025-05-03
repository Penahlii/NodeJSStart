import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedbackMessage: {
    type: String,
    required: [true, "Feedback Message is Required"],
    trim: true,
  },
  os: {
    type: String,
    required: true,
  },
  totalRam: {
    type: String,
  },
  freeRam: {
    type: String,
  },
  runningTime: {
    type: String,
  },
  ipv4: {
    type: String,
  },
});

export const FeedbackMessage = mongoose.model(
  "FeedbackMessage",
  feedbackSchema
);
