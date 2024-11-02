import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      location: { type: String, required: true },
      password: { type: String, required: true },
      notifications: [
         {
            type: Types.ObjectId,
            ref: 'Notification'
         }
      ]
   },
   {
      timestamps: true
   }
);

// Add the toJSON plugin
userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
