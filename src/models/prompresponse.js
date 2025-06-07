const mongoose = require("../configration/dbConfig");
const promptResponseSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const PromptResponse = mongoose.model("PromptResponse", promptResponseSchema);
module.exports = PromptResponse;