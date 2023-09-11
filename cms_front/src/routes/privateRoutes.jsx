import ProtectedRoutes from "../components/ProtectedRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../components/home/Home";
import Paginas from "../components/paginas/Paginas";

const privateRoutes = [
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard/",
            element: <Home />,
          },
          {
            path: "/dashboard/paginas",
            element: <Paginas />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;
