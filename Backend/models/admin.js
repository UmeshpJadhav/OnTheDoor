const mongoose = require("mongoose");
const Joi = require("joi");


const adminSchema = mongoose.Schema({
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
        match: [/\S+@\S+\.\S+/]
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        match: [/(?=.*[A-Za-z])(?=.*\d)/]
    },
    role: {
        type: String,
        required: true,
        enum: ["superadmin", "admin",],
        default : "admin"

    }
}, { timestamps: true });


function validateAdmin(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(5).max(255).pattern(/\S+@\S+\.\S+/).required(),
        password: Joi.string().min(5).pattern(/^(?=.*[A-Za-z])(?=.*\d)/).required(),
        role: Joi.string().valid("superadmin", "admin").required()
    });

    return schema.validate(data);
}

module.exports = { 
    adminModel: mongoose.model("Admin", adminSchema), 
    validateAdmin 
};
