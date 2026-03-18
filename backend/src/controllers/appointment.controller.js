import Appointment from "../models/Appointment.js";
import Dentist from "../models/Dentist.js";

// @desc Create a new appointment (User)
export const createAppointment = async (req, res) => {
  try {
    console.log("Incoming Body:", req.body); // ✅ DEBUG

    let { patientName, age, gender, appointmentDate, dentistId } = req.body;

    // ✅ 1. VALIDATION
    if (!patientName || !age || !gender || !appointmentDate || !dentistId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ 2. CONVERT DATE (VERY IMPORTANT FIX)
    const parsedDate = new Date(appointmentDate);

    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment date",
      });
    }

    // ✅ 3. CHECK DENTIST EXISTS
    const dentist = await Dentist.findById(dentistId);

    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: "Dentist not found",
      });
    }

    // ✅ 4. CREATE APPOINTMENT
    const appointment = await Appointment.create({
      patientName,
      age,
      gender,
      appointmentDate: parsedDate,
      dentistId,
      status: "Pending", // ✅ EXPLICIT FIX
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error); // ✅ MUST ADD

    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
      error: error.message,
    });
  }
};

// @desc Get all appointments (Admin only)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "dentistId",
      "name clinicName",
    );
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

// @desc Delete appointment (Admin only)
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
