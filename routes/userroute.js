import {Router} from "express";
import { isauthenticated } from "../middlewares/auth.js";
import { deleteUser, getProfile, updateUserProfile, userLogin, userSignup } from "../controllers/userscontroller.js";



const userRouter = Router();

userRouter.post("/users/signup", userSignup);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", isauthenticated, getProfile);

userRouter.patch("/users/me",isauthenticated, updateUserProfile);

userRouter.delete("/users/me", isauthenticated, deleteUser)

export default userRouter;