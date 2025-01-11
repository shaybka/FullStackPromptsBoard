import express from 'express';
const PromptRouter = express.Router();
import { createPrompt,getAllPrompts,deletePrompt
    ,updatePrompt,searchPromptsByTitle,getPromptsByUser } from '../controllers/PromptController.js';
import { authenticateToken } from '../middleware/authenticate.js';

PromptRouter.post('/create-prompt', authenticateToken, createPrompt);
PromptRouter.get('/all-prompts', getAllPrompts);
PromptRouter.delete('/delete-prompt/:id', authenticateToken, deletePrompt);
PromptRouter.put('/update-prompt/:id', authenticateToken, updatePrompt);
PromptRouter.get('/search-prompts', searchPromptsByTitle);
PromptRouter.get('/user-prompts/:userId', getPromptsByUser);
export default PromptRouter;