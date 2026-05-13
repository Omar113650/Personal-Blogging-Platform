import Joi from "joi";

const messages = (fieldName) => ({
  "string.empty": `${fieldName} is required`,
  "string.min": `${fieldName} is too short`,
  "string.max": `${fieldName} is too long`,
  "any.required": `${fieldName} is required`,
});

const ImageSchema = Joi.object({
  url: Joi.string().uri().allow("").optional(),
  publicId: Joi.string().allow(null, "").optional(),
}).optional();

export const CreatePostValidation = Joi.object({
  Title: Joi.string().min(3).max(150).required().messages(messages("Title")),
  Content: Joi.string().min(10).required().messages(messages("Content")),
  Image: ImageSchema,
});

export const UpdatePostValidation = Joi.object({
  Title: Joi.string().min(3).max(150).messages(messages("Title")),
  Content: Joi.string().min(10).messages(messages("Content")),
  Image: ImageSchema,
})
  .min(1)
  .messages({ "object.min": "Please add at least one field to update" });
