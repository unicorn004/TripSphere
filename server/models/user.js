const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

// Validation schema without username
const userValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),

  city: Joi.string()
    .required()
    .messages({
      'string.empty': 'City is required',
      'any.required': 'City is required'
    }),
});

const validateUser = (userData) => {
  return userValidationSchema.validate(userData);
};

module.exports = { User, validateUser };
