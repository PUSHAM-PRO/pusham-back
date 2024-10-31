import { Schema, type } from "mongoose";
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false 
    },
    status: {
        type: String,
        enum: ['Unread', 'Read'],
        default: 'Unread'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

    sentVia: {
        type: [String],
        enum: ['Push', 'WhatsApp', 'Email'],
        required: true
    }
})

notificationSchema.plugin(toJSON);

export const notificationModel = model('notification', notificationSchema);