import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// 🔐 Generate token
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// @desc Register admin (only once or seed)
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({ email, password, role: "admin" });

    res.status(201).json({
      success: true,
      message: "Admin created",
      data: admin,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Admin registration failed",
      error: error.message,
    });
  }
};

// @desc Login admin
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
