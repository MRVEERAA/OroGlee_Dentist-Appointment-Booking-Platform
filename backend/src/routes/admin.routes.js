import express from "express";
import { registerAdmin, adminLogin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", adminLogin);

export default router;
