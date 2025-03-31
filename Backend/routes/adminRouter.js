const express = require("express");
const router = express.Router();
const { adminModel } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


  router.post("/login",async function(req,res){
   try{
   
   
   
   let { email , password} = req.body 
   let admin = await adminModel.findOne({ email });
   if(!admin) return res.send("this admin is not available");
   
   let valid =await bcrypt.compare(password, admin.password);
   if(valid){
    let token = jwt.sign({ email: "admin@admin.com" }, password.env.JWT_KEY);
    res.cookie("token", token)
  
   }
   
    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash("amdmin", salt);

    // let user = new  adminModel({
    //     name : "Umesh",
    //     email :"admin@admin.com",
    //     password : hashedPassword,
    //     role : "admin12345",
    //   })

    //   await user.save();

    //   let token = jwt.sign({ email: "admin@admin.com"}, process.env.JWT_KEY);
    //   res.cookie("token", token);
    //   res.send("admin creted successfully");
   }
   catch(err){
    res.send(err.message);
   }
  })




module.exports= router;


