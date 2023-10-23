const Joi = require('joi');

exports.createBannerValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
  });

  return schema.validate(data);
};

exports.updateBannerValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    subtitle: Joi.string().optional(),
  });

  return schema.validate(data);
};

exports.informationCreateValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  });

  return schema.validate(data);
};

exports.informationUpdateValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().optional(),
  });

  return schema.validate(data);
};
