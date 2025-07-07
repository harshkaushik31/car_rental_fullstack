import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['owner','user'],
        default: 'user'
    },
    image:{
        type: String,
        default: ''
    }
},{timestamps: true})

export const User = mongoose.model('User',UserSchema)