const Joi = require('joi');

exports.courseCreateValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    duration: Joi.number().optional().min(1),
    contact: Joi.string()
      .required()
      .pattern(/^[0-9]{10,15}$/),
    shortDescription: Joi.string().required().max(255),
    description: Joi.string().optional(),
    curriculum: Joi.string().optional(),
    brochureLink: Joi.string().optional().uri(),
  });

  return schema.validate(data);
};

exports.courseUpdateValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    duration: Joi.number().optional().min(1),
    contact: Joi.string()
      .optional()
      .pattern(/^[0-9]{10,15}$/),
    shortDescription: Joi.string().optional().max(255),
    description: Joi.string().optional(),
    curriculum: Joi.string().optional(),
    brochureLink: Joi.string().optional().uri(),
  });

  return schema.validate(data);
};
