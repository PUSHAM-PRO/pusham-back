import Joi from 'joi';

const notificationValidator = Joi.object({
    type: Joi.string()
        .valid('Ticket Update', 'Admin Message', 'Department Alert')
        .required(),
    title: Joi.string()
        .required(),
    message: Joi.string(),
    location: Joi.string(),
    image: Joi.string(),
    read: Joi.boolean()
        .default(false)
});

export default notificationValidator;
