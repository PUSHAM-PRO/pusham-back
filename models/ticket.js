import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
// import category from "./category.json" assert { type: "json" };
import { readFile } from 'fs/promises'
const category = JSON.parse(
  await readFile(new URL('./category.json', import.meta.url))
)
const ticketSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    department: { type: String },
    location: { type: String, required: true },
    problem: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String },
    status: {
      type: String,
      enum: ["initialized", "in_progress", "completed"],
      default: "initialized",
    },
    role: {
      type: String,
      enum: ["customer", "agent", "department", "superadmin"],
      default: "customer",
    },
    category: {
      type: String,
      enum: category.category
    },
    priority: { type: String, enum: ["low", "medium", "high", "highest"] },
    type: { type: String },
    assignedTo: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

ticketSchema.index({ name: "text", title: "text" });

ticketSchema.plugin(toJSON);

export const TicketModel = model("ticket", ticketSchema);

// import { Schema, model, Types } from "mongoose";
// import { toJSON } from "@reis/mongoose-to-json";


// const ticketSchema = new Schema({

//   department: { type: String },
//   location: { type: String, required: true },
//   problem: { type: String, required: true },
//   description: { type: String, required: true },
//   photo: { type: String },
//   status: { type: String, enum: ["initialized", "in_progress", "completed"], default: "initialized" },
//   role: {
//     type: String,
//     enum: ['customer', 'agent', 'department', 'superadmin'],
//     default: 'customer'
//   },
//   category: {
//     type: String,
//     enum: ['technical support', 'billing', 'account management', 'sales enquiry']
//   },
//   notifications: [
//     {
//       type: String,
//       // ref: 'Notification'
//     },
//   ],
// },
//   {
//     timestamps: true,
//   }
// );

// ticketSchema.index({ name: "text", title: "text" });

// ticketSchema.plugin(toJSON);

// export const TicketModel = model("ticket", ticketSchema);
