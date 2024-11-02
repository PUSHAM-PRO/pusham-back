import { Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const notificationSchema = new Schema({
    type: {
        type: String,
        enum: ['Ticket Update', 'Admin Message', 'Department Alert'],
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

   image: {
        type: String
    },

    status: {
        type: String,
        enum: ['Unread', 'Read'],
        default: 'Unread'
    },
    sentVia: {
        type: [String],
        enum: ['Push', 'Email'],
        required: true
    },

    userId: {
        type: String,
        required: false
    },

    ticketId: {
        type: String,
        required: false
    },
})

notificationSchema.plugin(toJSON);

export const notificationModel = model('Notification', notificationSchema);