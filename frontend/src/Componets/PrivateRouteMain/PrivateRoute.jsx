// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth ";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) {
    return <div>Cargando…</div>;
  }
  if (!user) {
    
    return <Navigate to="/" state={{ from: loc }} replace />;
  }
  return children;
}
