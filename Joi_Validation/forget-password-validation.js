const joi = require('joi');

const forgetPasswordValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email(),
    phone: joi.number(),
  });
  return schema.validate(data);
};

module.exports = forgetPasswordValidation;
