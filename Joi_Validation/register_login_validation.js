const joi = require('joi');

const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    phone: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    ip: joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email(),
    phone: joi.number(),
    password: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
