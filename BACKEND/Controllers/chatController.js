import { saveMessage, getMessage } from "../Services/chatServices.js";
import { authenticateToken } from "../Middleware/jwtMiddleware.js";

// Controller function to get messages by conversation ID
async function getMessagesController(req, res) {
  try {
    // Ensure user is authenticated
    authenticateToken(req, res, async () => {
      const messages = await getMessage(req.params.conversationId);
      res.json(messages);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Controller function to save a new message
async function saveMessageController(req, res) {
  const { user, message, processedMessage } = req.body;
  console.log(user);
  try {
    // Ensure user is authenticated
    authenticateToken(req, res, async () => {
      const newMessage = await saveMessage(user, message, processedMessage);
      res.status(201).json(newMessage);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { saveMessageController, getMessagesController };
