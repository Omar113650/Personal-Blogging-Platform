import Joi from "joi";

const messages = (fieldName) => ({
  "string.empty": `${fieldName} is required`,
  "string.min": `${fieldName} is too short`,
  "string.max": `${fieldName} is too long`,
  "any.required": `${fieldName} is required`,
  "string.email": `Please enter a valid email address`,
  "string.pattern.base": `${fieldName} must contain uppercase, lowercase, and a number`,
});

export const RegisterValidation = Joi.object({
  Name: Joi.string().min(3).max(30).required().messages(messages("Name")),
  Email: Joi.string().email({ tlds: { allow: false } }).required().messages(messages("Email")),
  Password: Joi.string().min(8).max(64).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages(messages("Password")),
});

export const LoginValidation = Joi.object({
  Email: Joi.string().email({ tlds: { allow: false } }).required().messages(messages("Email")),
  Password: Joi.string().required().messages(messages("Password")),
});
