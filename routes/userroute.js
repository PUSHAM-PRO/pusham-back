import {Router} from "express";
import { isAuthenticated} from "../middlewares/auth.js";
import { deleteUser, getProfile, updateUserProfile, userLogin, userSignup } from "../controllers/userscontroller.js";



const userRouter = Router();

userRouter.post("/users/signup", userSignup);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", isAuthenticated, getProfile);

userRouter.patch("/users/me/:id",isAuthenticated, updateUserProfile);

userRouter.delete("/users/me/:id", isAuthenticated, deleteUser)

export default userRouter;