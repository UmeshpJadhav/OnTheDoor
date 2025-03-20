const mongoose = require("mongoose");
const Joi = require("joi");


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    }
});

function validateCategory(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });

    return schema.validate(data);
}

module.exports = { 
    categoryModel: mongoose.model("Category", categorySchema), 
    validateCategory 
};
