import express from "express";
import {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";
//import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

//  Public route
router.post("/", createAppointment);

//  Admin routes
router.get("/", getAppointments);
router.delete("/:id", deleteAppointment);
router.put("/:id", updateAppointmentStatus);
export default router;
