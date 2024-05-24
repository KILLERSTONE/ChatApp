import express from 'express';
import { processLlm } from '../Controllers/endpointController.js';
import { authenticateToken } from '../Middleware/jwtMiddleware.js';

const router = express.Router();

// Route to process LLM request
router.post('/llm', authenticateToken, processLlm);

export default router;
