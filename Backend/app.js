const express = require("express");
const app = express();
const expressSession = require('express-session')
const authRouter = require("./routes/auth");
const path = require("path");
require('dotenv').config()  // IF we dont write this gives the uri eeror always remember when we used env dont forgot to write require("dotenv").config()
const connectDB = require("./config/mongoose-connection");
const indexRouter = require("./routes/indexRouter");
require("./config/google_oauth_config");

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(
    expressSession({
        resave: false,  //Prevents saving session data to the session store if nothing has changed.
        saveUninitialized : false,  //Prevents storing empty sessions (sessions with no data).
        secret : process.env.SESSION_SECRET
    })
)

connectDB();


app.use("/", indexRouter);
app.use("/auth", authRouter)










const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));






