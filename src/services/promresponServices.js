const PromptResponse = require("../models/prompresponse");

class PromResponseService {
  async savePromptResponse(prompt, response, userId) {
    const newPromptResponse = new PromptResponse({
      prompt,
      response,
      user: userId,
    });
    return await newPromptResponse.save();
  }

  async getPromptResponses(userId) {
    return await PromptResponse.find({ user: userId }).sort({ createdAt: -1 });
  };

  async getPromptResponseById(id) {
    return await PromptResponse.findById(id);
  }

  async deletePromptResponseById(id) {
    return await PromptResponse.findByIdAndDelete(id);
  }

  async deleteAllPromptResponses() {
    return await PromptResponse.deleteMany({});
  }
}

module.exports = new PromResponseService();
