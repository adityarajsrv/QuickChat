import express from "express";
import { protectRoutes } from "../middlewares/auth.js";
import { checkAuth, updateProfile, login, signup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update-profile", protectRoutes, updateProfile)
userRouter.get("/check", protectRoutes, checkAuth)

export default userRouter;