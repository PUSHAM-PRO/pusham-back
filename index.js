import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userroute.js";
import ticketRouter from "./routes/ticket.js";
import admin from "firebase-admin";
import serviceAccount from "./pushKey.json" assert { type: "json" };
import notificationRouter from "./routes/notification.js";
import documentRouter from "./routes/document.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// connect mongodb
await mongoose.connect(process.env.MONGO_URI);

//  create an express app
const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

//Use route in app
app.use(userRouter);
app.use(ticketRouter);
app.use(notificationRouter);
app.use(documentRouter);

//  listen for incoming requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
