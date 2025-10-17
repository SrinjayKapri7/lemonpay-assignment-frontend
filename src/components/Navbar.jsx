import React, { useState, useContext, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { logoutUser } from "../api/auth";


const Navbar = () => {
  const { currentUser, setIsAuthenticated } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
        
        await logoutUser()
        setIsAuthenticated(false)
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white px-6 py-4 shadow flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer">Lemonpay Task Management App</div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          <FaUserCircle className="text-3xl text-gray-700" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
            <div className="px-4 py-2 flex items-center space-x-3 border-b border-gray-200">
              <FaUserCircle className="text-xl text-gray-600" />
              <span className="text-gray-800 font-medium truncate">
                {currentUser}
              </span>
            </div>
            <button
              className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white text-red-600 font-semibold rounded-b"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
