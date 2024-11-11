import { Router } from "express";
import { sendNotification } from "../controllers/notification.js";

import { isAuthenticated } from "../middlewares/auth.js";  

const notificationRouter = Router();

//Define routes:
notificationRouter.post('/notify', isAuthenticated, sendNotification)

export default notificationRouter;
