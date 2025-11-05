// import React from "react";
// import { PlusCircle, ListChecks } from "lucide-react";
// import { NavLink } from 'react-router-dom';

// interface SidebarProps {
//   active: string;
//   onSelect: (menu: string) => void;
// }

// const AdminSidebar: React.FC<SidebarProps> = ({ active, onSelect }) => (
//   <div className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col">
//     <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
//     <nav className="flex gap-4 bg-gray-800 text-white p-4">
//     <NavLink
//       to="/admin/dashboard/add"
//       className={({ isActive }) =>
//         isActive ? "text-blue-400 font-bold" : "text-white"
//       }
//     >
//       <PlusCircle className="mr-2" /> Add Question
//       Home
//     </NavLink>
//     <NavLink
//       to="/admin/dashboard/add"
//       className={({ isActive }) =>
//         isActive ? "text-blue-400 font-bold" : "text-white"
//       }
//     >
//     <ListChecks className="mr-2" /> View Questions
//    </NavLink>
//     </nav>
//   </div>
// );

// export default AdminSidebar;

import React from "react";
import { PlusCircle, ListChecks } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  active?: string;
  onSelect?: (menu: string) => void;
}

const AdminSidebar: React.FC<SidebarProps> = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="bg-amber-900 text-white w-64 min-h-screen flex flex-col border-r border-gray-800">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/admin/dashboard/add" className={navLinkClass}>
          <PlusCircle size={20} /> Add Question
        </NavLink>

        <NavLink to="/admin/dashboard/list" className={navLinkClass}>
          <ListChecks size={20} /> View Questions
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;

