const PromResponseService = require("../services/promresponServices");

class PromResponseController {

async savePromptResponse(req, res) {
  const { prompt, response, userId } = req.body;

  if (!prompt || !response || !userId) {
    return res
      .status(400)
      .json({ error: "Prompt, response, and userId are required" });
  }

  try {
    const savedResponse = await PromResponseService.savePromptResponse(
      prompt,
      response,
      userId // pass userId to the service
    );
    return res.status(201).json(savedResponse);
  } catch (error) {
    console.error("Error saving prompt response:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async getPromptResponses(req, res) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }
  try {
    const responses = await PromResponseService.getPromptResponses(userId);
    return res.status(200).json(responses);
  } catch (error) {
    console.error("Error fetching prompt responses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
  async deletePromptResponseById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const response = await PromResponseService.deletePromptResponseById(id);
      if (!response) {
        return res.status(404).json({ error: "Response not found" });
      }
      return res.status(200).json({ message: "Deleted" });
    } catch (error) {
      console.error("Error fetching prompt response by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

async deleteAllPromptResponses(req, res) {
  try {
    await PromResponseService.deleteAllPromptResponses();
    return res.status(200).json({ message: "All history deleted" });
  } catch (error) {
    console.error("Error deleting all prompt responses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

}



module.exports = new PromResponseController();
