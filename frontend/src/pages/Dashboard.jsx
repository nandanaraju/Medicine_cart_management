// import React from 'react'
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";



// const Dashboard = () => {
//     const navigate = useNavigate();
//     const handleLogout = async () => {
//         await fetch("http://localhost:5000/api/auth/logout", {
//           method: "GET",       
//           credentials: "include",
//         });
//         toast.success("Logged out successfully");
//         navigate("/login");
//     };
    
//   return (
//     <div className='mt-32'>
//         <button onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }

// export default Dashboard

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiHome } from "react-icons/fi";
import { toast } from "react-toastify";


const Dashboard = () => {
  const navigate = useNavigate();
    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "GET",       
          credentials: "include",
        });
        toast.success("Logged out successfully");
        navigate("/login");
    };
  return   (
    <div className="min-h-screen flex mt-16">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FiHome /> <span>Dashboard</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FiSettings /> <span>Settings</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FiSettings /> <span>Logout</span>
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Admin Dashboard</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/add-product" className="w-full">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700">
                Add Product
              </button>
            </Link>
            <Link to="/products" className="w-full">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
