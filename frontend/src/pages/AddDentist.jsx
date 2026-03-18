import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Building2, Briefcase, Award, Image } from "lucide-react";

// ✅ Toast Component
function Confirmation({ message }) {
  return (
    <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slideIn">
      {message}
    </div>
  );
}

export default function AddDentist() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    qualification: "",
    experience: "",
    clinicName: "",
    address: "",
    location: "",
    photo: "",
  });

  const [showMsg, setShowMsg] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/dentists", form);

      // ✅ Show toast instead of alert
      setShowMsg(true);

      // Auto hide + redirect
      setTimeout(() => {
        setShowMsg(false);
        navigate("/admin-panel");
      }, 2000);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      {/* ✅ TOAST */}
      {showMsg && <Confirmation message="Dentist Created Successfully ✅" />}

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-xl border"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Dentist
        </h2>

        <div className="space-y-4">
          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Dentist Name"
              required
              onChange={handleChange}
              className="bg-transparent outline-none px-3 w-full"
            />
          </div>

          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Award size={18} className="text-gray-400" />
            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              required
              onChange={handleChange}
              className="bg-transparent outline-none px-3 w-full"
            />
          </div>

          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Briefcase size={18} className="text-gray-400" />
            <input
              type="number"
              name="experience"
              placeholder="Experience"
              required
              onChange={handleChange}
              className="bg-transparent outline-none px-3 w-full"
            />
          </div>

          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Building2 size={18} className="text-gray-400" />
            <input
              type="text"
              name="clinicName"
              placeholder="Clinic Name"
              required
              onChange={handleChange}
              className="bg-transparent outline-none px-3 w-full"
            />
          </div>

          <textarea
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <MapPin size={18} className="text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              required
              onChange={handleChange}
              className="bg-transparent outline-none px-3 w-full"
            />
          </div>

          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Image size={18} className="text-gray-400" />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              onChange={handleChange}
              className="bg-transparent outline-none px-3 w-full"
            />
          </div>
        </div>

        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition">
          Create Dentist
        </button>
      </form>
    </div>
  );
}
