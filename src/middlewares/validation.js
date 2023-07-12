const Joi = require('joi');

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

const userSchema = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(3).max(50).required(),
});
module.exports = { validationMiddleware, userSchema };