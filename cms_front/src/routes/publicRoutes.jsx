import Login from "../components/login/Login";
import Register from "../components/register/Register";

const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Register />,
  },
];

export default publicRoutes;
