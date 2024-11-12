import Joi from 'joi';

const notificationValidator = Joi.object({
    type: Joi.string().valid('Ticket Update', 'Admin Message', 'Power Outage', 'Department Alert').required(),
    title: Joi.string().required(),
    message: Joi.string().required(),
    location: Joi.string().optional(),
    image: Joi.string().optional(),
    read: Joi.boolean().default(false)
});

export default notificationValidator;
