import jwt from "jsonwebtoken";
<<<<<<< HEAD
import * as userService from "../services/user.service.js";

const protectRoute = async (req, res, next) => {
  try {
    // Support cookie, Authorization header, and X-Auth-Token (mobile proxies may strip Authorization)
    let token = req.cookies.jwt;
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token && req.headers["x-auth-token"]) {
      token = req.headers["x-auth-token"];
    }
=======
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
>>>>>>> 6674c8e (project)
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
<<<<<<< HEAD
    const user = await userService.findUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
=======
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
>>>>>>> 6674c8e (project)
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
