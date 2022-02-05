const joi = require('joi');

const registerValidation = (data) => {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phone: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    dateOfBirth: joi.string().required(),
    gender: joi.string().required(),
    nextOfKin: joi.string().required(),
    houseAddress: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    zipcode: joi.string().required(),
    // ip: joi.string().required(),
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
