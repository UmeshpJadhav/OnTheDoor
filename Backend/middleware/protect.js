const jwt = require("jsonwebtoken");
const {userModel }= require("../models/user");

module.exports.protect = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies); 
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: "Please login first" });
        }

        console.log("Token received:", req.cookies.token); 
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        req.user = await userModel.findOne({ email: data.email }).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message); 
        return res.status(401).json({ message: "Invalid token" });
    }
};
