import { Link } from "react-router-dom";
import { FaHospital, FaMapMarkerAlt } from "react-icons/fa";

export default function DentistCard({ dentist }) {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* 🔵 TOP SECTION */}
      <div className="relative h-52 bg-gradient-to-r from-indigo-500 to-purple-500 flex flex-col items-center justify-center">
        {/* IMAGE */}
        <img
          src={dentist.photo || defaultImage}
          alt={dentist.name}
          className="w-28 h-28 rounded-full border-4 border-white object-cover transition duration-500 hover:scale-110"
          onError={(e) => (e.target.src = defaultImage)}
        />

        {/* NAME BELOW IMAGE */}
        <h2 className="text-white text-lg font-semibold mt-3 text-center px-2">
          {dentist.name}
        </h2>

        {/* EXPERIENCE BADGE */}
        <span className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {dentist.experience || 0} Yrs Exp
        </span>
      </div>

      {/* 🔻 DETAILS */}
      <div className="p-5 text-center">
        {/* Qualification */}
        <p className="text-blue-500 text-base font-medium">
          {dentist.qualification}
        </p>

        {/* Info */}
        <div className="mt-3 text-gray-600 text-sm space-y-2">
          <p className="flex items-center justify-center gap-2">
            <FaHospital /> {dentist.clinicName}
          </p>

          <p className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt /> {dentist.address}
          </p>
        </div>

        {/* BUTTON */}
        <Link
          to={`/book/${dentist._id}`}
          className="mt-5 block bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
