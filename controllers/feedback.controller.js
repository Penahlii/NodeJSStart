import { FeedbackMessage } from "../models/feedback.model.js";
import { getTokenContents } from "../utils/getTokenContent.js";
import { logErrorToFile } from "../utils/logger.js";
import { getSystemInfo } from "../utils/systemInfo.js";

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackMessage.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ message: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await FeedbackMessage.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ message: error.message });
  }
};

export const getFeedbacksByUser = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { id } = getTokenContents(res, accessToken);
    const feedbacks = await FeedbackMessage.find({ author: id }).populate(
      "author",
      "name surname email"
    );

    res.status(200).json(feedbacks);
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ message: error.message });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { id } = getTokenContents(res, accessToken);

    const systemInfo = getSystemInfo();

    const feedback = new FeedbackMessage({
      author: id,
      feedbackMessage: req.body.feedbackMessage,
      ...systemInfo,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ message: error.message });
  }
};
