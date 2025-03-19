const mongoose = require("mongoose");
const { applyTimestamps } = require("./user");


const productSchmema = mongoose.Schema({
    nmae :{
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true 
    },
    category : {
        type : String,
        required : true
    },
    stock : {
        type : Boolean,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required :true
    }

}, {timestamps : true });

module.exports = mongoose.model("product", productSchmema);