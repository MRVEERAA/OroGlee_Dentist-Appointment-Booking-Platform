import { useEffect, useState } from "react";
import DentistCard from "../components/DentistCard";
import Filters from "../components/Filters";
import Loader from "../components/Loader";
import { getAllDentists } from "../api/dentistApi";

export default function Home() {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    experience: "",
    location: "",
    qualification: "",
  });

  // Fetch dentists
  useEffect(() => {
    const fetchDentists = async () => {
      const data = await getAllDentists();
      setDentists(data);
      setLoading(false);
    };

    fetchDentists();
  }, []);

  // Filter logic
  const filteredDentists = Array.isArray(dentists)
    ? dentists.filter(
        (d) =>
          (!filters.experience || d.experience === +filters.experience) &&
          (!filters.location || d.location === filters.location) &&
          (!filters.qualification || d.qualification === filters.qualification),
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* 🔥 HEADER / INTRO */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Find the Best Dentists Near You
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Discover experienced dental professionals based on location,
            qualification, and expertise. Choose the right dentist for your
            needs easily.
          </p>
        </div>

        {/* 🔍 FILTERS */}
        <Filters
          filters={filters}
          setFilters={setFilters}
          dentists={dentists}
        />

        {/* 📊 CONTENT */}
        {loading ? (
          <Loader />
        ) : filteredDentists.length === 0 ? (
          <p className="text-center text-gray-500 mt-12 text-lg">
            No dentists found with selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredDentists.map((d) => (
              <DentistCard key={d._id} dentist={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
