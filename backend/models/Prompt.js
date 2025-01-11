import mongoose from "mongoose";

const { Schema } = mongoose;

const PromptSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        validate: [
            (value) => value.length <= 7500,
            "content must be less than 7500 characters",
        ],
    },
    tags: {
        type: String,
        required: true,
    },
   
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    avatar: {
        type: String,
      

    },
    authorName:{
        type: String,
        required:true
    }

},{
    timestamps: true,
}

);

const Prompt = mongoose.model("Prompt", PromptSchema);
export default Prompt;