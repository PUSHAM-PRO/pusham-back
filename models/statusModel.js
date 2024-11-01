import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

export const statusSchema = new Schema(
  {
    ticket: { type: String },
    previousStatus: { type: String },
    newsStatus: { type: String },
    changedBy: { type: String },
  },
  {
    timestamps: true,
  }
);

statusSchema.plugin(toJSON)

export const StatusModel = model("Status", statusSchema)

const statusHistorySchema = new Schema({
  statusId: { type: Types.ObjectId, ref: 'Status' },
  oldStatus: { type: String, },
  newStatus: { type: String, },
  updatedBy: { type: String },
}, {
    timestamps: true
});

statusHistorySchema.plugin(toJSON)

export const StatusHistoryModel = model('StatusHistory', statusHistorySchema);
