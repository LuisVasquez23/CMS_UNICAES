import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthProvider from "./auth/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
// Configurando rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registrar",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
