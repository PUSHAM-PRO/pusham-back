import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const notificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "Ticket Update",
        "Power Outage",
        "Admin Message",
        "Department Alert",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    location: { type: String },
    image: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.plugin(toJSON);

export const NotificationModel = model("Notification", notificationSchema);
