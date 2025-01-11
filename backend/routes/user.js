import express from 'express';
const UserRouter = express.Router();
import { loginUser, registerUser } from '../controllers/UserController.js';
import upload from '../middleware/upload.js';
import { authenticateToken } from '../middleware/authenticate.js';

UserRouter.post('/register-user', upload.single('avatar'), registerUser );
UserRouter.post('/login-user', loginUser );

export default UserRouter;