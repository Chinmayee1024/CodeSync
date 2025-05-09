const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "not_mentions",
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  resetToken: { type: String },
  tokenExpiry: { type: Date },
  status: { type: Number, default: 1 },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// we are geenrating jokens
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(` there is an error in token generation:${err}`);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
