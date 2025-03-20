const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,  
        maxlength: 255  
    },
    price: {
        type: Number,
        required: true,
        min: 0.01  
    },
    category: {
        type: String,
        required: true,
        minlength: 3,  
        maxlength: 50  
    },
    stock: {
        type: Number,
        min: 0 
    },
    description: {
        type: String,
        minlength: 5,  
        maxlength: 500  
    },
    image: {
        type: String,
    }
}, { timestamps: true });  


function validateProduct(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        price: Joi.number().min(0.01).required(),
        category: Joi.string().min(3).max(50).required(),
        stock: Joi.number().min(0).required(),
        description: Joi.string().min(5).max(500),
        image: Joi.string().optional()
    });

    return schema.validate(data);
}


module.exports = {
    productModel : mongoose.model("Product" , productSchema), validateProduct
}