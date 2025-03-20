const mongoose = require("mongoose");
const Joi = require("joi");


const paymentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    method: {
        type: String,
        required: true,
        
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    transactionId: {
        type: String,
        required: true,
    }
}, { timestamps: true });


function validatePayment(data) {
    const schema = Joi.object({
        order: Joi.string().hex().length(24).required(),
        amount: Joi.number().min(1).required(),
        method: Joi.string().required(),
        status: Joi.string().valid("Pending").required(),
        transactionId: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports = { 
    paymentModel: mongoose.model("Payment", paymentSchema), 
    validatePayment 
};
