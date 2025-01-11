import express from 'express';
const PromptRouter = express.Router();
import { createPrompt } from '../controllers/PromptController.js';
import { authenticateToken } from '../middleware/authenticate.js';

PromptRouter.post('/create-prompt', authenticateToken, createPrompt);

export default PromptRouter;