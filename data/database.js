import mongoose from "mongoose";

export const connectDB = () =>{
mongoose
    .connect((process.env.MONGODB_URI),{
        dbName: "todo",
    })
    .then( (c) =>   console.log("Database connnected Successfully") )
    .catch( (e) =>  console.log(e) )
}