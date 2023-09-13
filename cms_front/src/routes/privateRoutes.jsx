import ProtectedRoutes from "../components/ProtectedRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../components/home/Home";
import Paginas from "../components/paginas/Paginas";
import Paginascreate from "../components/paginas/Paginascreate";

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

          {
            path: "/dashboard/paginas/create",
            element: <Paginascreate />,
          },

        ],
      },
    ],
  },
];

export default privateRoutes;
