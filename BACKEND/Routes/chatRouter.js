import express from 'express';
import { getMessagesController, saveMessageController } from '../Controllers/chatController.js';
import { authenticateToken } from '../Middleware/jwtMiddleware.js';

const router = express.Router();


// Route to get messages by conversation ID
router.get('/messages/:conversationId', authenticateToken, getMessagesController);

// Route to save a new message
router.post('/messages', authenticateToken, saveMessageController);

export default router;
