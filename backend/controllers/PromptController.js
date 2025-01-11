import Prompt from '../models/Prompt.js';

/**
 * 1. **Create Prompt (`createPrompt`)**
 *    - Extract user information from the request.
 *    - Validate input fields.
 *    - Create and save a new prompt.
 *    - Return the created prompt in the response.
 */
export const createPrompt = async (req, res) => {
    try {
        const user = req.user._id;       
        const { title, content, tags } = req.body;
        const newPrompt = new Prompt({
            title,
            content,
            tags,
            author: user,
            avatar:req.user.avatar,
            authorName:req.user.username,
        });
        await newPrompt.save();
        res.status(201).json(newPrompt);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong, please try again');
    }
};
