import mongoose from "mongoose";

const dentistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Dentist name is required"],
      trim: true,
    },

    photo: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },

    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
    },

    clinicName: {
      type: String,
      required: [true, "Clinic name is required"],
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Dentist", dentistSchema);
