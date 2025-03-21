const express = require("express");
const app = express();
require('dotenv').config()  // IF we dont write this gives the uri eeror always remember when we used env dont forgot to write require("dotenv").config()
const connectDB = require("./config/mongoose-connection");
const indexRouter = require("./routes/indexRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectDB();


app.use("/", indexRouter);










const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));






