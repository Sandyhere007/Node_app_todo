import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login  = async (req,res,next) =>{ 
    try {
        // Getting data from req.body
    const {email, password} = req.body;

    // Finding user in db and giving error if not found
    let user = await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("User Not Found! Login First",400));

    const isMatched = await bcrypt.compare(password,user.password);
    if(!user) return next(new ErrorHandler("Invalid Credentials!",404));
        sendCookie(user, res, "Login Successfully!", 200);

    } catch (error) {
        next(error);        
    }
};

export const register = async (req,res,next) => { 
   try {
     // Getting data from req.body
     const { name , email , password } = req.body;
     // Finding user in db and giving error if not found
     let user = await User.findOne({email});
     if(user) return next(new ErrorHandler("user already exists",404));
 
     // Hashing the password and creating a new user in the database with that password  Creating cookies and sending json data
     const hashedPassword = await bcrypt.hash(password,10);
     user = await User.create({ name,email,password:hashedPassword })
    
     sendCookie(user, res, "Registered Successfully", 201);
   } catch (error) {
        next(error);
   }
 };


export const getMyProfile = (req,res,next) =>{
    res.status(200).json({
        success:true,
        user : req.user,
    })

};

export const logout = (req,res,next) =>{
    res.status(404).cookie("token","",{expires: new Date(Date.now())})
    .json({
        success:true,
        message :"Logout successfully!",
    })
}