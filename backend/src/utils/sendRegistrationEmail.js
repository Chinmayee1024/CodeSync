const sendEmail = require("../utils/email");

const sendRegistrationEmail = async (userEmail, userName) => {
  try {
    await sendEmail(
      userEmail,
      "🎉 Welcome to CodeSync!",
      `Hi ${userName}, welcome to CodeSync!`,
      `
        <h1 style="color: #faae17; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 28px; text-align: center; margin-bottom: 24px;">
          🚀 Welcome to CodeSync!
        </h1>

        <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; margin: 0 0 16px;">
          Dear <strong>${userName}</strong>,
        </p>

        <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
          We're excited to welcome you to <strong>CodeSync</strong> — your all-in-one platform for seamless and intelligent coding experiences.
        </p>

        <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
          As a member of our growing community, you now have access to powerful features designed to supercharge your workflow:
        </p>

        <ul style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; line-height: 1.8; padding-left: 20px; margin: 0 0 20px;">
    <li>⚡ <strong>Run code directly</strong> in your browser using multiple programming languages</li>
          <li>🗣️ <strong>Turn your speech into code</strong> with advanced voice-to-text capabilities</li>
          <li>🖼️ <strong>Extract code or content</strong> from images using smart OCR</li>
          <li>🧘 <strong>Focus better</strong> with a clean and distraction-free interface</li>
        </ul>


        <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; margin: 0 0 16px;">
          Click below to log in and get started:
        </p>

        <p style="text-align: center; margin: 20px 0;">
          <a
            href="http://localhost:3000/login"
            style="background-color: #faae17; color: #1c1e29; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; font-size: 16px;"
          >
            🔐 Get Started
          </a>
        </p>

        <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; margin: 0 0 30px;">
          Have questions or feedback? We’d love to hear from you — just
          <a href="mailto:chinmayeemohanty412@gmail.com" style=" text-decoration: underline;">reach us anytime</a>.
        </p>
          <pre style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; margin: 0;">
      Thanks,
      The CodeSync Team
    </pre>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
        
        <p style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 12px; text-align: center; margin: 0;">
          &copy; 2025 CodeSync. All rights reserved.<br/>
          Crafted with innovation and care.
        </p>
      `
    );
  } catch (error) {
    console.error("Error sending registration email:", error.message);
  }
};

module.exports = sendRegistrationEmail;
