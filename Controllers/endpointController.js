import messageService from '../Services/chatServices.js'
import dialogflowService from '../Services/dialogFlowServices.js';

async function processLlm(req, res) {
  try {
    // Check if req.user exists and contains necessary properties
    if ( !req.user.userId) {
      throw new Error('User data missing or incomplete');
    }

    const userId = req.user.userId; // Retrieve userId from req.user

    const { message } = req.body;

    const processedMessage = await dialogflowService.processLlmRequest(userId, message);
    const newMessage = await messageService.saveMessage(req.user.username, message, processedMessage);

    res.json({ message: processedMessage });
  } catch (error) {
    console.error('Error processing LLM request:', error);
    res.status(500).json({ message: 'Error processing message' });
  }
}


export { processLlm };
