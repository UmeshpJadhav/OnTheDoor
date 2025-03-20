const mongoose = require("mongoose");
const Joi = require("joi");


const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",  
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });


function validateCart(data) {
    const schema = Joi.object({
        user: Joi.string().hex().length(24).required(),  
        product: Joi.string().hex().length(24).required(),
        totalPrice: Joi.number().min(0).required()
    });

    return schema.validate(data);
}

module.exports = { 
    cartModel: mongoose.model("Cart", cartSchema), 
    validateCart 
};
