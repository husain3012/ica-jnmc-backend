import jwt from "jsonwebtoken";
import {User} from "../models/index.js";
// auth middleware
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.APP_SECRET);
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).send({ message: "Invalid Token" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default authMiddleware;
