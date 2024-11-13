import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String },
    password: { type: String, required: true },
    department: { type: String },
    nationality: { type: String },
    phoneNumber: { type: Number },
    role: {
      type: String, 
      enum: ['customer', 'agent', 'department', 'superadmin'],
       default: 'customer', required: true
  },
  
    // notifications: [
    //   {
    //     type: String,
    //     // ref: 'Notification'
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// Add the toJSON plugin
userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
