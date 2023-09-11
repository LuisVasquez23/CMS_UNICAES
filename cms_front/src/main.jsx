import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";

// Combina todas las rutas en un solo arreglo
const allRoutes = [...publicRoutes, ...privateRoutes];

// Configurando rutas
const router = createBrowserRouter(allRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
