import express from "express";
import {
  createAppointment,
  getAppointments,
  deleteAppointment,
} from "../controllers/appointment.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

//  Public route
router.post("/", createAppointment);

//  Admin routes
router.get("/", protect, admin, getAppointments);
router.delete("/:id", protect, admin, deleteAppointment);

export default router;
