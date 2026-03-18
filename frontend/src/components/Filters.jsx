import { MapPin, Award, Briefcase } from "lucide-react";

export default function Filters({ filters, setFilters, dentists }) {
  const experienceOptions = [
    ...new Set(dentists.map((d) => d.experience)),
  ].sort((a, b) => a - b);

  const locationOptions = [...new Set(dentists.map((d) => d.location))];

  const qualificationOptions = [
    ...new Set(dentists.map((d) => d.qualification)),
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
      {/* GRID FIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* EXPERIENCE */}
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl shadow-sm w-full">
          <Briefcase size={16} className="text-gray-400" />
          <select
            value={filters.experience}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                experience: e.target.value,
              }))
            }
            className="bg-transparent outline-none text-sm text-gray-700 w-full cursor-pointer"
          >
            <option value="">Experience</option>
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp}>
                {exp} yrs
              </option>
            ))}
          </select>
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl shadow-sm w-full">
          <MapPin size={16} className="text-gray-400" />
          <select
            value={filters.location}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            className="bg-transparent outline-none text-sm text-gray-700 w-full cursor-pointer"
          >
            <option value="">Location</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* QUALIFICATION */}
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl shadow-sm w-full">
          <Award size={16} className="text-gray-400" />
          <select
            value={filters.qualification}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                qualification: e.target.value,
              }))
            }
            className="bg-transparent outline-none text-sm text-gray-700 w-full cursor-pointer"
          >
            <option value="">Qualification</option>
            {qualificationOptions.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
