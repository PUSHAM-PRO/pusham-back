import Joi from "joi";

export const addTicketValidador = Joi.object({
    date:Joi.string().required(),
    department:Joi.string(). required(),
    location:Joi.string().required(),
    problem:Joi.string().required(),
    description:Joi.string().required(),
    photo:Joi.string()

})

export const updateTicketValidator = Joi.object({
    date:Joi.string().required(),
    problem:Joi.string().required(),
    description:Joi.string().required()
})