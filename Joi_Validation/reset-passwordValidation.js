const joi = require('joi');

const resetPasswordValidation = (data) => {
  const schema = joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = resetPasswordValidation;
