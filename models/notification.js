import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const notificationSchema = new Schema({
    type: {
        type: String,
        enum: ['Ticket Update','Power Outage', 'Admin Message', 'Department Alert'],
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    image: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    // sentVia: {
    //     type: [String],
    //     validate: {
    //         validator: (v) => v.every(value => ['Push', 'Email'].includes(value)),
    //         message: props => `${props.value} is not a valid notification method.`
    //     },
    //     required: true
    // },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: false
    },
    ticketId: {
        type: Types.ObjectId,
        ref: 'Ticket',
        required: false
    }
}, {
    timestamps: true
});

notificationSchema.plugin(toJSON);

export const NotificationModel = model('Notification', notificationSchema);

