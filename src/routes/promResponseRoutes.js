// const express = require('express');
// const PromResponseController = require('../Controllers/promResponseController');
// const router = express.Router();

// router.post('/save', PromResponseController.savePromptResponse);

// module.exports = router;

const express = require("express");
const router = express.Router();
const promResponseController = require("../Controllers/promResponseController");

router.post("/", (req, res) =>
  promResponseController.savePromptResponse(req, res)
);

router.get(
  "/",
  promResponseController.getPromptResponses.bind(promResponseController)
);

router.delete("/delete/:id", (req, res) =>
  promResponseController.deletePromptResponseById(req, res)
);
router.delete("/delete-all", (req, res) =>
  promResponseController.deleteAllPromptResponses(req, res)
);
module.exports = router;
