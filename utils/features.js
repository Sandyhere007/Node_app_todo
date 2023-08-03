import jwt from "jsonwebtoken";

export const sendCookie =  (user,res,message,statusCode = 201)=>{
const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
res.status(201).cookie("token",token,{
    httpOnly:true, 
    maxAge:1000*60*60*30,
    sameSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
    secure : process.env.NODE_ENV==="Development" ? false : true,
}).json({
    success: true,
    message ,
})
}