const userService = require("../services/userService");
const User = require("../models/user");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.createUser({ username, email, password });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const resetToken = await userService.generatePasswordResetToken(user);
    // --- Email sending logic ---
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: "riteshkumarsahu1345@gmail.com",
        pass: "bmdnstzqvkxfkgbj", // Use an app password, not your main password
      },

    });
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`; // Change to your frontend URL
    const mailOptions = {
      from: "riteshkumarsahu1345@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    };
    console.log("Reset link:", resetLink);

    await transporter.sendMail(mailOptions);
    // --- End email sending logic ---

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await userService.resetPassword(resetToken, newPassword);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    res.status(200).json({ message: "Password reset successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
