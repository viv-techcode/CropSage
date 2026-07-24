const express = require("express");
const router = express.Router();

const controller = require("../controllers/conversationController");
const requireAuth = require("../middleware/authMiddleware");

router.get("/", requireAuth, controller.getConversations);

router.post("/", requireAuth, controller.createConversation);

router.get("/:id", requireAuth, controller.getConversation);

router.post("/:id/messages", requireAuth, controller.addMessage);

router.delete("/:id", requireAuth, controller.deleteConversation);

module.exports = router;