const crypto = require("crypto");
const User = require("../models/user");

// Generate and save a reset token
exports.generatePasswordResetToken = async (user) => {
  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  return token;
};

// Reset password using token
exports.resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) return null;
  user.password = newPassword; // Hash in production!
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return user;
};

exports.createUser = async ({ username, email, password }) => {
  // You should hash the password before saving in production!
  const user = new User({ username, email, password });
  return await user.save();
};

exports.findUserByEmailAndPassword = async (email, password) => {
  return await User.findOne({ email, password });
};
