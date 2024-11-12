import Joi from 'joi';

const documentValidator = Joi.object({
    title: Joi.string().required(),
    type: Joi.string()
        .valid('Legal Agreement', 'Terms of Reference', 'Contract')
        .required(),
    description: Joi.string().optional().allow(null, ''),
    uploadDate: Joi.date().default(() => new Date(), 'current date').optional(),
    fileUrl: Joi.string().uri().required(),
    createdBy: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/) // Ensures it's a valid MongoDB ObjectId
        .required(),
    role: Joi.string()
        .valid('customer', 'agent', 'department', 'superAdmin')
        .required()
});

export default documentValidator;
