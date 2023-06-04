import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            required: true,
            type: String,
            min: 2,
            max: 50
        },
        lastName: {
            required: true,
            type: String,
            min: 2,
            max: 50
        },
        email: {
            required: true,
            type: String,
            unique: true, 
            max: 50
        },
        password: {
            required: true,
            type: String,
            min: 5
        },
        picturePath: {
            type: String,
            default: " ",
        },
        friends:{
            type: Array,
            default: []
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impression: Number
    },
    {timestamps: true});



const User = mongoose.model("User", userSchema);

export default User;