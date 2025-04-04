const jwt = require("jsonwebtoken");
require("dotenv").config();

async function validateAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("You should login first");

    const data = jwt.verify(token, process.env.JWT_KEY);
    req.user = data; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send("Invalid or expired token");
  }
}

module.exports = validateAdmin;
