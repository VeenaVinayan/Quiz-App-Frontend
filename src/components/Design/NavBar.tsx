import React, { useState,  useRef, useEffect } from "react";
import useAuthContext from '../../customHook/Auth';

import { SquareDashed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const context = useAuthContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    context?.logout();
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/user/profile");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-gray-100 shadow-md relative">
   
      <div className="flex items-center gap-3">
        <SquareDashed color="gray" size={26} />
        <h1 className="text-2xl font-bold text-amber-800">QuizMaster</h1>
      </div>

      {context?.isAuthenticated ? (
        <div className="relative" ref={menuRef}>
     
          <div
            className="bg-amber-600 rounded-full shadow-2xl w-10 h-10 flex items-center justify-center cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="text-white font-bold">
              {context?.userData?.name?.slice(0, 1)?.toUpperCase() || "U"}
            </span>
          </div>

       
          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
              <button
                onClick={handleProfile}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-amber-600 text-white px-5 py-2 rounded-full hover:bg-amber-700 transition-all"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
