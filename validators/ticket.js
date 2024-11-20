import Joi from "joi";

export const addTicketValidator = Joi.object({
  department: Joi.string(), //superAdmin
  location: Joi.string(),
  problem: Joi.string().required(),
  description: Joi.string().required(),
  photo: Joi.string(),
  status: Joi.string(),
  role: Joi.string().valid("customer", "agent", "department", "superadmin"),
  category: Joi.string().valid(
    "technical support",
    "billing",
    "account management",
    "sales enquiry"
  ),
  assignedTo: Joi.string(),
});

export const updateTicketValidator = Joi.object({
  department: Joi.string(),
  location: Joi.string(),
  problem: Joi.string().required(),
  description: Joi.string().required(),
  photo: Joi.string(),
  status: Joi.string(),
  category: Joi.string().valid(
    "technical support",
    "billing",
    "account management",
    "sales enquiry"
  ),
  role: Joi.string().valid("customer", "agent", "department", "superadmin"),
  status: Joi.string().valid("initialized", "in_progress", "completed"),
  priority: Joi.string().valid("low", "medium", "high", "highest"),
  type: Joi.string(),
  assignedTo: Joi.string(),
});
