const Joi = require('joi');

exports.createEnquiryValidator = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().optional(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
};

exports.updateEnquiryStatusValidation = (data) => {
  const schema = Joi.object({
    status: Joi.string().valid('RESOLVED', 'PENDING', 'IN PROCESS').required(),
  });

  return schema.validate(data);
};
