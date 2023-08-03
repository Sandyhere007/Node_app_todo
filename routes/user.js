import express from "express";

import { getMyProfile,register,login ,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/me" , isAuthenticated , getMyProfile);

userRouter.post("/register" , register);

userRouter.post("/login" , login);


userRouter.get("/logout" , isAuthenticated , logout);

export default userRouter;