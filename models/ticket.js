import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const ticketSchema = new Schema({
    
    department: { type: String, required: true },
    location: { type: String, required: true },
    problem: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String },
    status: { type: String},
    role: {
        type: String,
        enum: ['customer', 'agent', 'department', 'superadmin'],
        required: true
    },
    category: {
        type: String,
        enum: ['technical support', 'billing', 'account management', 'sales enquiry']
    },
    notifications: [
        {
            type: Types.ObjectId,
            ref: 'Notification'
        }
    ]
},
    {
        timestamps: true
    });

ticketSchema.index({ name: 'text', title: 'text' });

ticketSchema.plugin(toJSON)

export const TicketModel = model('ticket', ticketSchema);