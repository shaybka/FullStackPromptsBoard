import express from 'express';
import connectDB from './config/db.js';
import chalk from 'chalk';
import UserRouter from './routes/user.js';
import PromptRouter from './routes/prompt.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import getLocalIP from './utils/getHost.js'; 

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/user', UserRouter);
app.use('/api/prompt', PromptRouter); 

// Database Connection
mongoose.set('strictQuery', true);
connectDB();

// Get Host IP
const host = getLocalIP();

// Start Server
app.listen(PORT, () => {
    console.log(`${chalk.yellow.bold('server')} is running on port ${PORT}`);
    console.log(`${chalk.blue.bold('host')} is running on http://${host}:${PORT}`);
});