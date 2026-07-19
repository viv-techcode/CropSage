const { getFarmAdvice } = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Message is required.",
      });
    }

    const reply = await getFarmAdvice(message);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to contact AI service.",
    });
  }
};

module.exports = {
  chatWithAI,
};