const Joi = require('joi');

exports.createServiceValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    shortDescription: Joi.string().required(),
    description: Joi.string().required(),
  });

  return schema.validate(data);
};
exports.updateServiceValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    shortDescription: Joi.string().optional(),
    description: Joi.string().optional(),
  });

  return schema.validate(data);
};
