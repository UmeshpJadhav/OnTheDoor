const mongoose = require("mongoose");
const Joi = require("joi");


const orderSchema = mongoose.Schema({
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
        min: 1
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery"
    }
}, { timestamps: true });


function validateOrder(data) {
    const schema = Joi.object({
        user: Joi.string().hex().length(24).required(),
        product: Joi.string().hex().length(24).required(),
        totalPrice: Joi.number().min(1).required(),
        address: Joi.string().min(10).required(),
        status: Joi.string().valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled").required(),
        payment: Joi.string().hex().length(24).required(),
        delivery: Joi.string().hex().length(24).optional()
    });

    return schema.validate(data);
}

module.exports = { 
    orderModel: mongoose.model("Order", orderSchema), 
    validateOrder 
};
