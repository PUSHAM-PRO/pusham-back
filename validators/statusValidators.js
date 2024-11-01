import Joi from "joi";

export const addStatusValidator = Joi.object({
    ticket: Joi.string(),
    previousStatus: Joi.string(),
    newsStatus: Joi.string(),
    changedBy: Joi.string()
})

export const statusValidator = Joi.object({
    ticket: Joi.string(),
    previousStatus: Joi.string(),
    newsStatus: Joi.string(),
    changedBy: Joi.string()
})