const mongoose = require("mongoose");
const Joi = require("joi");


const addressSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  zip: {
    type: Number,
    required: true,
    min: 10000,  
    max: 99999
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    match: [/\S+@\S+\.\S+/, "Invalid email format"]
  },
  password: {  
    type: String,
    minlength: 5,
    maxlength: 8,
    match: [/(?=.*[A-Za-z])(?=.*\d)/, "Password must contain at least one letter and one number"]
  },
  phone: {
    type: Number,
    required: true,
    min: 1000000000,  
    max: 9999999999
  },
  addresses: {
    type: [addressSchema],
    required: true,
  }
}, { timestamps: true });


function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(255).pattern(/\S+@\S+\.\S+/).required(),
    password: Joi.string().min(5).max(8) .pattern(/^(?=.*[A-Za-z])(?=.*\d)/),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
    addresses: Joi.array().items(
      Joi.object({
        state: Joi.string().min(2).max(50).required(),
        zip: Joi.number().min(10000).max(99999).required(),
        city: Joi.string().min(2).max(50).required(),
        address: Joi.string().min(5).max(255).required()
      })
    ).min(1).required()
  });

  return schema.validate(data);
}

module.exports = { 
  userModel : mongoose.model("User", userSchema), 
  validateUser 
};
