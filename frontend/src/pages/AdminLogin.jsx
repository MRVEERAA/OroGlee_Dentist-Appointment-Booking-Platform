import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem("adminLoggedIn") === "true";
    if (isLogged) {
      navigate("/admin-panel", { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("adminLoggedIn", "true");
      setLoading(false);
      navigate("/admin-panel", { replace: true });
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-4">
      {/* CARD */}
      <div className="bg-white/70 backdrop-blur-xl border shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <ShieldCheck className="text-indigo-600" size={28} />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Access</h2>

        <p className="text-gray-500 mb-6 text-sm">
          Secure login to manage appointments and dentists
        </p>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 
            ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
            }`}
        >
          {loading ? "Signing in..." : "Login as Admin"}
        </button>
      </div>
    </div>
  );
}
