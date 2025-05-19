const express = require("express");
const router = express.Router();
const Feedback = require("../model/feedbackSchema");
const nodemailer = require("nodemailer");

// Load env variables
require("dotenv").config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // your App Password
  },
});

// POST Feedback
router.post("/feedback", async (req, res) => {
  const { name, email, feedback } = req.body;
  console.log("📩 Feedback Received:", req.body);

  // Check if email is valid
  if (!email || !email.includes("@")) {
    console.log("❌ Invalid user email");
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    // Save to MongoDB
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    console.log("✅ Feedback saved to DB");

    // === Email to Admin (You) ===
    const adminMailOptions = {
      from: `"CodeSync Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.FEEDBACK_RECEIVER || process.env.EMAIL_USER,
      subject: `📬 New Feedback from ${name}`,
      replyTo: email,
      html: `
    <div style="background-color: #1c1e29; padding: 40px; font-family: Arial, sans-serif; color: #f2f2f2;">
      <div style="max-width: 600px; margin: auto; background-color: #070808cc; border-radius: 10px; padding: 30px; box-shadow: 0 0 15px rgba(250, 174, 23, 0.2);">
        <h2 style="color: #faae17;">📬 New Feedback Received</h2>
        <p style="margin: 10px 0;"><strong style="color: #faae17;">Name:</strong> ${name}</p>
        <p style="margin: 10px 0;"><strong style="color: #faae17;">Email:</strong> ${email}</p>
        <p style="margin: 20px 0 10px;"><strong style="color: #faae17;">Message:</strong></p>
        <div style="background-color: #f2f2f2; color: #1c1e29; padding: 15px; border-left: 5px solid #faae17; border-radius: 5px;">
          ${feedback}
        </div>
        <p style="margin-top: 30px; font-size: 13px; color: #bbb;">This feedback was sent through the CodeSync website.</p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(adminMailOptions);
    console.log("📨 Admin feedback email sent");

    // === Thank You Email to User ===
   const userMailOptions = {
  from: `"CodeSync" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Thank You for Your Feedback! ✨",
  html: `
    <h2 style="color: #faae17; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-bottom: 16px;">
      Thank You! ✨
    </h2>

    <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; margin: 0 0 16px;">
      Hi <strong>${name || "there"}</strong>,
    </p>

    <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
      Thank you for sharing your valuable feedback on <strong>CodeSync</strong>. Your insights help us improve and build a better coding experience for everyone.
    </p>

    <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; margin: 0 0 16px;">
      🚀 Ready to code more? Click below to visit:
    </p>

    <p style="text-align: left; margin: 0 0 24px;">
      <a
        href="http://localhost:3000/"
        style="background-color: #faae17; color: #1c1e29; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; font-size: 15px;"
      >
        🔐Visit CodeSync
      </a>
    </p>

    <pre style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; margin: 0;">
      Thanks,
      The CodeSync Team
    </pre>
  `,
};


    await transporter.sendMail(userMailOptions);
    console.log("📨 Thank-you email sent to user");

    res
      .status(201)
      .json({ message: "Feedback submitted and emails sent successfully" });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ message: "Server Error while handling feedback" });
  }
});

module.exports = router;
