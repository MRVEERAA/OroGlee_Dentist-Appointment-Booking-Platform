import Appointment from "../models/Appointment.js";
import Dentist from "../models/Dentist.js";

// @desc Create a new appointment (User)
export const createAppointment = async (req, res) => {
  try {
    const { patientName, age, gender, appointmentDate, dentistId } = req.body;

    // Validate required fields
    if (!patientName || !age || !gender || !appointmentDate || !dentistId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if dentist exists
    const dentist = await Dentist.findById(dentistId);
    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: "Dentist not found",
      });
    }

    const appointment = await Appointment.create({
      patientName,
      age,
      gender,
      appointmentDate,
      dentistId,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
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
