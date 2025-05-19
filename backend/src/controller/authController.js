const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendRegistrationEmail = require("../utils/sendRegistrationEmail");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, cpassword, role } = req.body;
  if (!userName || !userEmail || !password || (!cpassword && role)) {
    return res
      .status(422)
      .send({ Error: "Enter Completed Details for Processing" });
  }

  try {
    const userExist = await User.findOne({ userEmail, status: 1 });
    if (userExist) {
      return res.status(421).json({ Error: "Email already exist" });
    } else if (password !== cpassword) {
      return res.status(420).json({ Error: "Password are not matching" });
    }

    const user = new User({ userName, userEmail, password, role });
    await user.save();
    await sendRegistrationEmail(userEmail, userName);
    res.status(200).json({ success: "User Register Successfully" });
  } catch (err) {
    console.log(`Register Error : ${err}`);
  }
};

const loginUser = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    if (!userEmail || !password) {
      return res.status(403).json({ error: "Please fill the data" });
    }

    const user = await User.findOne({ userEmail, status: 1 });
    if (!user) {
      return res.status(400).json({ error: "Invalid userName or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign(
      { _id: user._id, userEmail: user.userEmail },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );
    user.tokens = token;
    await user.save();
    res.status(200).json({
      message: "User login successful",
      token,
      user: { _id: user._id, userName: user.userName },
    });
  } catch (err) {
    console.error(`Login Error: ${err}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = (req, res) => {
  res.status(200).send("User Logged out successfully");
};

const forgotPassword = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) return res.status(400).json({ error: "Email is required" });

  const user = await User.findOne({ userEmail, status: 1 });
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.tokenExpiry = Date.now() + 3600000;
  console.log("Before save", user.resetToken, user.tokenExpiry);
  await user.save();
  console.log("After save", user);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: '"CodeSync" <yourgmail@gmail.com>',
    to: user.userEmail,
    subject: "Password Reset",
    html: `
    <div style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; line-height: 1.6;">
      <p>Hello <strong>${user.userName || ""}</strong>,</p>

      <p style="font-weight: 500;">
        Click the button below to reset your password:
      </p>

      <p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 10px 20px; background-color: #faae17; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
      </p>

      <p>This link is valid for 1 hour.</p>

      <p style="margin-top: 30px;">
        Thanks,<br />
        <strong>The CodeSync Team</strong>
      </p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Password reset link sent to your userEmail" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send userEmail" });
  }
};

const resetPassword = async (req, res) => {
  const { password, cpassword } = req.body;
  const { token } = req.params;

  if (!password || !cpassword)
    return res.status(400).json({ error: "All fields are required" });

  if (password !== cpassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const user = await User.findOne({
    resetToken: token,
    tokenExpiry: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ error: "Token is invalid or expired" });
  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    return res
      .status(409)
      .json({ error: "New password must be different from the old password" });
  }
  user.password = password;
  user.resetToken = undefined;
  user.tokenExpiry = undefined;
  await user.save();

  // Send confirmation email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"CodeSync" <yourgmail@gmail.com>',
    to: user.userEmail,
    subject: "Password Reset Successful",
    html: `
    <div style="color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; line-height: 1.6;">
      <p>Hello <strong style="color: #faae17;">${
        user.userName || ""
      }</strong>,</p>

      <p>Your password has been successfully reset.</p>

         <p style=" font-weight: 500;"><strong>
        If you did not perform this action, please 
        <a href="mailto:chinmayeemohanty412@gmail.com" style=" text-decoration: underline;">contact support</a> immediately.</strong>
      </p>

      <p style="margin-top: 30px;">
        Thanks,<br />
        <strong style="color: #faae17;">The CodeSync Team</strong>
      </p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password has been reset and email sent" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(200).json({
      message: "Password has been reset but failed to send confirmation email",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
