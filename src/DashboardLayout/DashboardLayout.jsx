import React from "react";
import { Outlet } from "react-router";
import DashboardAside from "../Components/AdminDashboard/DashboardAside";


const DashboardLayout = () => {
  return (
    <div className="flex">
      <DashboardAside />
      <main className="flex-1 p-5 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
