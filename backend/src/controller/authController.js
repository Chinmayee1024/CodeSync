const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, cpassword, role } = req.body;
  if (!userName || !userEmail || !password || (!cpassword && role)) {
    return res
      .status(422)
      .send({ Error: "Enter Completed Details for Processing" });
  }

  try {
    const userExist = await User.findOne({ userEmail });
    if (userExist) {
      return res.status(421).json({ Error: "Email already exist" });
    } else if (password !== cpassword) {
      return res.status(420).json({ Error: "Password are not matching" });
    }

    const user = new User({ userName, userEmail, password, cpassword, role });
    await user.save();
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

    const user = await User.findOne({ userEmail });
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
      { expiresIn: "7d" }
    );

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
  res.status(200).send("User Logout");
};

const forgotPassword = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) return res.status(400).json({ error: "Email is required" });

  const user = await User.findOne({ userEmail });
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.tokenExpiry = Date.now() + 3600000;
  await user.save();

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
    html: `<p>Hello ${user.userName || ""},</p>
           <p>Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>This link is valid for 1 hour.</p>`,
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

  user.password = password;
  user.resetToken = undefined;
  user.tokenExpiry = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset" });
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
