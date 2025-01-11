import Prompt from '../models/Prompt.js';

/**
 * 1. **Create Prompt (createPrompt)**
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

/**
 * 2. **Get All Prompts (getAllPrompts)**
 *    - Retrieve all prompts from the database.
 *    - Return the list of prompts in the response.
 */

export const getAllPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find().sort({ createdAt: -1 });
        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong, please try again');
    }
};
/**
 * 3. **Delete Prompt (deletePrompt)**
 *    - Extract the prompt ID from the request parameters.
 *    - Find the prompt by ID.
 *    - Check if the prompt exists.
 *    - Verify that the requesting user is the author of the prompt.
 *    - Delete the prompt from the database.
 *    - Return a success message in the response.
 */
export const deletePrompt = async (req, res) => {
    try {
        const { id } = req.params;
        const prompt = await Prompt.findById(id);

        if (!prompt) {
            return res.status(404).json({message:'Prompt not found'});
        }

       
        console.log('User ID:', req.user._id);
        console.log('Prompt Author ID:', prompt.author.toString());

        // Check if the user is the author of the prompt
        if (prompt.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message:'You are not authorized to delete this prompt'});
        }

        await Prompt.deleteOne({ _id: id });
        res.status(200).json({message:'Prompt deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Something went wrong, please try again'});
    }
};

/**
 * 4. **Update Prompt (updatePrompt)**
 *    - Extract the prompt ID from the request parameters.
 *    - Validate input fields.
 *    - Find the prompt by ID.
 *    - Check if the prompt exists.
 *    - Verify that the requesting user is the author of the prompt.
 *    - Update the prompt with new data.
 *    - Save the updated prompt to the database.
 *    - Return the updated prompt in the response.
 */
export const updatePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    console.log('User ID:', req.user._id);
    console.log('Prompt Author ID:', prompt.author.toString());

    // Check if the user is the author of the prompt
    if (prompt.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this prompt' });
    }

    prompt.title = title;
    prompt.content = content;
    prompt.tags = tags;

    const updatedPrompt = await prompt.save();
    res.status(200).json(updatedPrompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};
/**
 * 5. **Search Prompts by Title (searchPromptsByTitle)**
 *    - Extract the search keyword from query parameters.
 *    - Search for prompts with titles matching the keyword (case-insensitive).
 *    - Return the list of matching prompts in the response.
 */
export const searchPromptsByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const prompts = await Prompt.find({ title: { $regex: title, $options: 'i' } });
        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Something went wrong, please try again'});
    }
};

/**
 * 6. **Get Prompts by User (getPromptsByUser)**
 *    - Extract the user ID from request parameters.
 *    - Find all prompts authored by the specified user.
 *    - Return the list of user's prompts in the response.
 */
export const getPromptsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const prompts = await Prompt.find({ author: userId.trim() });
        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Something went wrong, please try again'});
    }
};