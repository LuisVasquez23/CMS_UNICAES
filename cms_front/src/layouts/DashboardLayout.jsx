import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function DashboardLayout() {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}
