import express  from "express";
import { deleteTask, getAllTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticated, newTask);
taskRouter.get("/all", isAuthenticated, getAllTask);
taskRouter.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);