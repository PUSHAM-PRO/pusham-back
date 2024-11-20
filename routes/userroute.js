import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { profileUpload } from "../middlewares/upload.js";
import {
  deleteUser,
  getProfile,
  updateUserProfile,
  userLogin,
  userSignup,
} from "../controllers/userscontroller.js";

const userRouter = Router();

userRouter.post("/users/signup", profileUpload.single('profileImage'), userSignup);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", isAuthenticated, getProfile);

userRouter.patch("/users/me", isAuthenticated, updateUserProfile);

userRouter.delete("/users/me", isAuthenticated, deleteUser);

export default userRouter;