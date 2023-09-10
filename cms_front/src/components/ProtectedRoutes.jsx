import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const ProtectedRoutes = () => {
  const auth = useAuth();

  

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
