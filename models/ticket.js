import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const ticketSchema = new Schema({
    date: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    problem: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String },
},
    {
        timestamps: true
    });

ticketSchema.index({ name: 'text', title: 'text' });

ticketSchema.plugin(toJSON)

export const TicketModel = model('ticket', ticketSchema);