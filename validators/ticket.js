import Joi from "joi";

export const addTicketValidator = Joi.object({

    department: Joi.string(),//superAdmin
    location: Joi.string(),
    problem: Joi.string().required(),
    description: Joi.string().required(),
    photo: Joi.string(),
    status: Joi.string(),
    role: Joi.string().valid(
        'customer',
        'agent',
        'department',
        'superadmin'
    ),
    category: Joi.string().valid(
        'technical support',
        'billing',
        'account management',
        'sales enquiry'
    ),
    notification: Joi.string()


});

export const updateTicketValidator = Joi.object({
    // user: Joi.string().required(),

    department: Joi.string(),
    location: Joi.string(),
    problem: Joi.string().required(),
    description: Joi.string().required(),
    photo: Joi.string(),
    status: Joi.string(),
    AssignedAgent: Joi.string(),
    dateSubmission: Joi.string(),
    dateExecution: Joi.string(),
    priority: Joi.string(),
    type: Joi.string(),
   
});
