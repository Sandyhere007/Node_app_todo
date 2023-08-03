import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async(req,res,next) =>{
    try {
        const { title , description } = req.body;
        // const task = new Task({title,description});
        await Task.create({
            title,
            description,
            user:req.user,
        });
        res.status(201).json({
            success:true,
            message:"New task created",
        })
    } catch (error) {
        next(error);
    }
};

export const getAllTask = async(req,res,next) =>{
   try {
    const user_id = req.user._id;
    const tasks = await Task.find({user: user_id});
    res.status(200).json({
        success: true,
        tasks,
    })
   } catch (error) {
    next(error);
   }
};

export const updateTask = async(req,res,next) =>{
    try {
        const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Task not found",404));
    task.isComplete= !task.isComplete;
    await task.save();
    res.status(200).json({
        success: true,
        message:"Updated Successfully",
    });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async(req,res,next) =>{
   try {
    const task = await Task.findById(req.params.id);
    if(!task) return next(new Error("Invalid Id"));
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message:"Updated Successfully"  
    });
   } catch (error) {
    next(error);
   }
};