import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const statusOptions = ["Pending", "Confirmed", "Cancelled"];

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, {
        status,
      });

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a)),
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Confirmed") return "bg-green-100 text-green-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow"
      >
        Logout
      </button>

      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

          <div className="bg-white shadow-sm px-8 py-5 rounded-2xl text-center">
            <p className="text-4xl font-bold text-indigo-600">
              {appointments.length}
            </p>
            <p className="text-gray-500">Total Appointments</p>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Manage and update appointment statuses
          </p>

          <button
            onClick={() => navigate("/add-dentist")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
          >
            + Add Dentist
          </button>
        </div>

        {/* HEADER */}
        <div className="hidden md:grid grid-cols-7 px-6 py-3 text-sm text-gray-500 font-semibold">
          <span>Patient</span>
          <span>Age</span>
          <span>Gender</span>
          <span>Date</span>
          <span>Dentist</span>
          <span>Clinic</span>
          <span className="text-center">Status</span>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4">
          {appointments.map((a) => (
            <div
              key={a._id}
              className="grid grid-cols-2 md:grid-cols-7 bg-white p-5 rounded-2xl shadow-sm"
            >
              <div>{a.patientName}</div>
              <div>{a.age}</div>
              <div>{a.gender || "-"}</div>
              <div>{a.appointmentDate?.split("T")[0]}</div>
              <div>{a.dentistId?.name}</div>
              <div>{a.dentistId?.clinicName}</div>

              <div className="text-center">
                <select
                  value={a.status}
                  onChange={(e) => handleStatusChange(a._id, e.target.value)}
                  className={`px-4 py-2 rounded-full text-xs ${getStatusStyle(
                    a.status,
                  )}`}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No appointments found 🚫
          </div>
        )}
      </div>
    </div>
  );
}
