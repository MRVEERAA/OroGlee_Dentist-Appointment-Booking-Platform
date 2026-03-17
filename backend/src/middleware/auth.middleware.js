import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

//  Protect route
export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach admin from DB
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized, admin not found" });
      }

      // Proceed to next middleware
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};

// ⚡ Admin only middleware
export const admin = (req, res, next) => {
  if (req.admin && req.admin.role === "admin") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
};
