import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/Sidebar";
import Navbar from "../Design/NavBar";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

