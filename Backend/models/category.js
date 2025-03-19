const mongoose = required("mongoose");

const categoryModel = mongoose.Schema({
    nmae : {
        type : String,
        required : true
    }
});

mondule.exports = mongoose.model("category", categoryModel);