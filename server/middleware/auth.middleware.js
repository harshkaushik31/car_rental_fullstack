import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';

export const protect = async (req,res,next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(400).json({success: false,message: 'not authorized'})
    }

    try{
        const userId = jwt.decode(token,process.env.JWT_SECRET)

        if(!userId){
            return res.status(400).json({success: false,message: 'not authorized'})
        }

        req.user = await User.findById(userId).select("-password")
        next();

    }catch(error){
        return res.status(400).json({success: false,message: 'not authorized'})

    }
}