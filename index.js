import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import statusRouter from "./routes/statusRoutes.js";
import userRouter from "./routes/userroute.js";


// connect mongodb
await mongoose.connect(process.env.MONGO_URI);

//  create an express app
const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(statusRouter);

//  listen for incoming requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
