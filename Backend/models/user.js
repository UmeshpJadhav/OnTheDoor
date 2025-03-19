const mongoose = require("mongoose");


const addressScheam = monmgoose.Schema({
    state : {
        type : string,
        required : true
    },
    zip : {
        type : Number,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    adrress : {
        type : String,
        required : true
    }
})


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {  
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    addresses: [addressScheam]   // Address ko array banayenge 
}, { timestamps: true }); 



function validateModle(data) {
     joi.object({
        name : joi.String().min(3).required(),
        email : joi.String().email().required(),
        password : joi.String().required(),
        phone : joi.String().required(),
        addresses : joi.String().required()

     });
     Schema.validate(data)
}





module.exports = mongoose.model("User", userSchema);

