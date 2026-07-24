const Conversation = require("../models/Conversation");
const { getFarmAdvice } = require("../services/geminiService");

exports.createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      userId: req.user.id,
      title: "New Chat",
      messages: [],
    });

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      userId: req.user.id,
    }).sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const cleanMessage = message?.trim();

    if (!cleanMessage) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const history = conversation.messages.slice(-20).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    conversation.messages.push({
      role: "user",
      content: cleanMessage,
    });

    const reply = await getFarmAdvice(cleanMessage, history);

    conversation.messages.push({
      role: "assistant",
      content: reply,
    });

    if (conversation.title === "New Chat") {
      conversation.title = cleanMessage.substring(0, 40);
    }

    await conversation.save();

    res.json(conversation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.json({ message: "Conversation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};