import Joi from 'joi';

const documentValidator = Joi.object({
    title: Joi.string().required(),
    type: Joi.string()
        .valid('Legal Agreement', 'Terms of Reference', 'Contract')
        .required(),
    description: Joi.string(),
    fileUrl: Joi.string(),
    role: Joi.string()
        .valid('customer', 'agent', 'department', 'superAdmin')
        // .required()
});

export default documentValidator;
