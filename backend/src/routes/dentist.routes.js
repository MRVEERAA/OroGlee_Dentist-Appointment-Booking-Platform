import express from "express";
import {
  getDentists,
  createDentist,
  getDentistById,
  updateDentist,
  deleteDentist,
} from "../controllers/dentist.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getDentists);
router.get("/:id", getDentistById);

// Admin-only routes
router.post("/", createDentist);
router.put("/:id", protect, admin, updateDentist);
router.delete("/:id", protect, admin, deleteDentist);

export default router;
