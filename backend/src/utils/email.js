const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Create a transporter using SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail", // Example: using Gmail SMTP Specifies the email provider (Gmail in this case).
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or App Password
  },
  // debug: true, // Logs SMTP details
  // logger: true, // Logs connection events
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: `"CodeSync" <${process.env.EMAIL_USER}>`, // Sender email
      to, // Receiver email
      subject, // Email subject
      text, // Plain text message
      html, // HTML formatted message (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

module.exports = sendEmail;
