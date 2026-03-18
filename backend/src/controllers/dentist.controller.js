import Dentist from "../models/Dentist.js";

// @desc Get all dentists (Public)
export const getDentists = async (req, res) => {
  try {
    const { name, location, qualification, minExp } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" }; // case-insensitive search
    if (location) filter.location = location;
    if (qualification) filter.qualification = qualification;
    if (minExp) filter.experience = { $gte: Number(minExp) };

    const dentists = await Dentist.find(filter);

    res.status(200).json({
      success: true,
      message: "Dentists fetched successfully",
      data: dentists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dentists",
      error: error.message,
    });
  }
};

// @desc Get single dentist by ID (Public)
export const getDentistById = async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id);
    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: "Dentist not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Dentist fetched successfully",
      data: dentist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dentist",
      error: error.message,
    });
  }
};

// @desc Create dentist (Admin only)
export const createDentist = async (req, res) => {
  try {
    const dentist = await Dentist.create(req.body);
    res.status(201).json({
      success: true,
      message: "Dentist created successfully",
      data: dentist,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create dentist",
      error: error.message,
    });
  }
};

// @desc Update dentist (Admin only, supports partial updates)
export const updateDentist = async (req, res) => {
  try {
    const updateData = req.body;
    const dentist = await Dentist.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: "Dentist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dentist updated successfully",
      data: dentist,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update dentist",
      error: error.message,
    });
  }
};

// @desc Delete dentist (Admin only)
export const deleteDentist = async (req, res) => {
  try {
    const dentist = await Dentist.findByIdAndDelete(req.params.id);

    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: "Dentist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dentist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete dentist",
      error: error.message,
    });
  }
};
