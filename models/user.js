const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

const userValidationSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty': 'Username is required',
      'any.required': 'Username is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
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
