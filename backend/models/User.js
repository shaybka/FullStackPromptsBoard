import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const {schema} = mongoose;

const userschema = new Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase:true,
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        lowercase:true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [20, "Username cannot exceed 20 characters"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false,

    },
    avatar:{
        type: String,
    }

},{
    timestamps: true
});

userschema.pre("save", async function(next){
   if(!this.isModified("password")) return next();
   const salt = await bcrypt.genSalt(10);
   this.password =await bcrypt.hash(this.password, salt);
    next();
})

userschema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userschema);

export default User;