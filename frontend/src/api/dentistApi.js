import api from "./axiosInstance";

// Fetch all dentists
export const getAllDentists = async () => {
  try {
    const res = await api.get("/dentists");
    return Array.isArray(res.data) ? res.data : res.data.data || [];
  } catch (error) {
    console.error("Error fetching dentists:", error);
    return [];
  }
};

// Fetch single dentist by id
export const getDentistById = async (id) => {
  try {
    const res = await api.get(`/dentists/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching dentist by ID:", error);
    return null;
  }
};
