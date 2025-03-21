const express = require("expreess");
const router = express.Router();

routrer.get("/", (req,res)=>{
    res.send("Hello world");
})


module.exports = router;