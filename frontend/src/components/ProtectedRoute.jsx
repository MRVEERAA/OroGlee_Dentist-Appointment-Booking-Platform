import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLogged = localStorage.getItem("adminLoggedIn") === "true";

  if (!isLogged) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
