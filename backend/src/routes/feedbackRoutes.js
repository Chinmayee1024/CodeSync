const express = require("express");
const router = express.Router();
const Feedback = require("../model/feedbackSchema");

// POST Feedback
router.post(
  "/feedback",
  async (req, res) => {
    console.log("Received data:", req.body);
    const { name, email, feedback } = req.body;

    try {
      const newFeedback = new Feedback({ name, email, feedback });
      await newFeedback.save();
      res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

module.exports = router;
