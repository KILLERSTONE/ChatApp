import {saveMessage} from "../Services/chatServices.js";
import dialogflowService from "../Services/dialogFlowServices.js";

async function processLlm(req, res) {
  try {
    // Check if req.user exists and contains necessary properties
    console.log(req);
    if (!req.user || !req.user.userId || !req.user.username) {
      throw new Error("User data missing or incomplete");
    }

    const userId = req.user.userId; // Retrieve userId from req.user
    const username = req.user.username; // Retrieve username from req.user

    const { message } = req.body;

    const processedMessage = await dialogflowService.processLlmRequest(
      userId,
      message
    );

    // Optional message saving (modify saveMessage if needed)
    const newMessage = await saveMessage(username, message, processedMessage);

    res.json({ message: processedMessage });
  } catch (error) {
    console.error("Error processing LLM request:", error);
    if (error.message === "User data missing or incomplete") {
      res.status(400).json({ message: "Missing required user information" });
    } else {
      res.status(500).json({ message: "Error processing message" });
    }
  }
}

export { processLlm }