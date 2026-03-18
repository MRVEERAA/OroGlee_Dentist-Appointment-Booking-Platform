import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import api from "../api/axiosInstance";
import { getDentistById } from "../api/dentistApi";

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dentist, setDentist] = useState(null);
  const [loading, setLoading] = useState(true);

  const [appointmentData, setAppointmentData] = useState({
    name: "",
    age: "",
    gender: "",
    date: "",
  });

  const [booking, setBooking] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  // ✅ FETCH DENTIST
  useEffect(() => {
    const fetchDentist = async () => {
      try {
        const res = await getDentistById(id);
        const dentistData = res?.data || res;
        setDentist(dentistData);
      } catch (error) {
        console.error("Failed to load dentist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDentist();
  }, [id]);

  // ✅ BOOK APPOINTMENT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooking(true);

    try {
      await api.post("/appointments", {
        patientName: appointmentData.name,
        age: Number(appointmentData.age),
        gender: appointmentData.gender,
        appointmentDate: appointmentData.date,
        dentistId: id,
      });

      setConfirmation(true);
    } catch (error) {
      console.error("Appointment failed:", error);
      alert(error.response?.data?.message || "Booking failed");
      setBooking(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      {/* ✅ CONFIRMATION UI */}
      {confirmation ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center">
            {/* ICON */}
            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">
              ✔
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-gray-800">
              Booking Confirmed!
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-500 mt-2">
              Your appointment has been successfully booked.
              <br />
              We will contact you soon.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* ✅ DENTIST CARD */}
          <div className="md:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-28"></div>

            <div className="flex flex-col items-center -mt-14 p-6 text-center">
              <img
                src={dentist?.photo || "https://via.placeholder.com/150"}
                alt={dentist?.name || "Doctor"}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
              />

              <h2 className="text-xl font-bold mt-3">
                {dentist?.name || "No Name"}
              </h2>

              <p className="text-gray-500">
                {dentist?.qualification || "No Qualification"}
              </p>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-400 text-sm">Experience</p>
                  <p className="font-semibold text-blue-600">
                    {dentist?.experience
                      ? `${dentist.experience} Years`
                      : "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-400 text-sm">Clinic</p>
                  <p className="font-semibold">
                    {dentist?.clinicName || "N/A"}
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="mt-4 bg-gray-50 p-3 rounded-lg w-full">
                <p className="text-gray-400 text-sm">Address</p>
                <p className="text-sm text-gray-700">
                  {dentist?.address || "No address available"}
                </p>
              </div>
            </div>
          </div>

          {/* ✅ BOOKING FORM */}
          <form
            className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold">Book an Appointment</h2>

            <input
              type="text"
              placeholder="Patient Name"
              required
              value={appointmentData.name}
              onChange={(e) =>
                setAppointmentData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded"
            />

            <div className="flex gap-4">
              <select
                required
                value={appointmentData.age}
                onChange={(e) =>
                  setAppointmentData((prev) => ({
                    ...prev,
                    age: e.target.value,
                  }))
                }
                className="border px-3 py-2 rounded w-1/2"
              >
                <option value="">Age</option>
                {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                  <option key={age}>{age}</option>
                ))}
              </select>

              <select
                required
                value={appointmentData.gender}
                onChange={(e) =>
                  setAppointmentData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                className="border px-3 py-2 rounded w-1/2"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <input
              type="datetime-local"
              required
              value={appointmentData.date}
              onChange={(e) =>
                setAppointmentData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded"
            />

            <button
              type="submit"
              disabled={booking}
              className={`bg-blue-600 text-white py-2 rounded ${
                booking ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {booking ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
