import { Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const notificationSchema = new Schema({
    type: {
        type: String,
        enum: ['Scheduled', 'Real-time'],
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true
    },

    location:{
        type: String,
        required: false
    },

    userId: {
        type: String,
        required: false 
    },

    ticketId: {
        type: String,
        required: false
    },

    status: {
        type: String,
        enum: ['Unread', 'Read'],
        default: 'Unread'
    },
    sentVia: {
        type: [String],
        enum: ['Push', 'WhatsApp', 'Email'],
        required: true
    }
})

notificationSchema.plugin(toJSON);

export const notificationModel = model('notification', notificationSchema);