import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 1"],
      max: [120, "Age must be realistic"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },

    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },

    dentistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dentist",
      required: [true, "Dentist reference is required"],
    },

    status: {
      type: String,
      enum: ["Booked", "Completed"],
      default: "Booked",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Appointment", appointmentSchema);
