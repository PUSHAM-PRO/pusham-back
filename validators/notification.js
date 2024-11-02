import Joi from "joi";

export const postNotificationValidator = Joi.object({
    type: Joi.string()
        .valid('Scheduled', 'Real-time')
        .required()
        .label('Notification Type'),

    title: Joi.string()
        .required()
        .label('Notification Title'),

    message: Joi.string()
        .required()
        .label('Notification Message'),

    location: Joi.string()
        .optional()
        .label('Notification Location'),

    userId: Joi.string()
        .optional()
        .label('User ID'),

    status: Joi.string()
        .valid('Unread', 'Read')
        .default('Unread')
        .label('Notification Status'),

    timestamp: Joi.date()
        .default(() => Date.now())
        .label('Timestamp'),

    sentVia: Joi.array()
        .items(Joi.string().valid('Push', 'Email'))
        .required()
        .label('Sent Via')
});

export const updateNotificationValidator = Joi.object({
    type: Joi.string()
        .valid('Scheduled', 'Real-time')
        .required()
        .label('Notification Type'),

    title: Joi.string()
        .required()
        .label('Notification Title'),

    message: Joi.string()
        .required()
        .label('Notification Message'),

    location: Joi.string()
        .optional()
        .label('Notification Location'),

    userId: Joi.string()
        .optional()
        .label('User ID'),

    status: Joi.string()
        .valid('Unread', 'Read')
        .default('Unread')
        .label('Notification Status'),

    timestamp: Joi.date()
        .default(() => Date.now())
        .label('Timestamp'),

    sentVia: Joi.array()
        .items(Joi.string().valid('Push', 'Email'))
        .required()
        .label('Sent Via')
});
