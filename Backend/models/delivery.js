const mongoose = require("mongoose");
const Joi = require("joi");

const deliverySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",  
        required: true
    },
    deliveryBoy: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Pending"
    },
    trackingUrl: {
        type: String,
    },
    estimatedDelivery: {
        type: Date 
    }
}, { timestamps: true });


function validateDelivery(data) {
    const schema = Joi.object({
        order: Joi.string().hex().length(24).required(),
        deliveryBoy: Joi.string().min(3).max(50).optional(),
        status: Joi.string().valid("Pending", "Shipped", "Out for Delivery", "Delivered", "Cancelled"),
        trackingUrl: Joi.string().uri().optional(),
        estimatedDelivery: Joi.date().optional()
    });

    return schema.validate(data);
}

module.exports = { 
    deliveryModel: mongoose.model("Delivery", deliverySchema), 
    validateDelivery 
};
