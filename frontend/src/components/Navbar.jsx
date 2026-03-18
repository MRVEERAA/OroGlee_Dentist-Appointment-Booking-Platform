import { Link, useLocation } from "react-router-dom";
import { Home, Shield } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  const linkStyle = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 
     ${
       location.pathname === path
         ? "bg-blue-50 text-blue-600 font-semibold"
         : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
     }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 tracking-wide flex items-center gap-2"
      >
        🦷 OroGlee
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-3">
        {/* HOME */}
        <Link to="/" className={linkStyle("/")}>
          <Home size={18} />
          <span>Home</span>
        </Link>

        {/* ADMIN */}
        <Link
          to={isAdminLoggedIn ? "/admin-panel" : "/admin-login"}
          className={linkStyle(
            location.pathname === "/admin-panel"
              ? "/admin-panel"
              : "/admin-login",
          )}
        >
          <Shield size={18} />
          <span>Admin</span>
        </Link>
      </div>
    </nav>
  );
}
