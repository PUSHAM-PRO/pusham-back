import { Router } from "express";
import { addStatus, getAllStatusHistory, updateStatus } from "../controllers/statusControllers.js";

const statusRouter = Router();

statusRouter.post("/addStatus", addStatus);
statusRouter.patch("/updateStatus/:id", updateStatus);
statusRouter.get("/getStatusHistory", getAllStatusHistory);

export default statusRouter;
