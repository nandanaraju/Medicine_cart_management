import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiHome, FiLogOut, FiShoppingCart, FiPlusCircle, FiBox } from "react-icons/fi";
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

  return (
    <div className="min-h-screen flex bg-gray-100 mt-0">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between md:w-1/4 lg:w-1/5">
        <div>
          <h2 className="text-2xl font-bold mb-6">Master Admin</h2>
          <nav className="space-y-4">
            <Link to="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <FiHome /> <span>Dashboard</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <FiSettings /> <span>Settings</span>
            </Link>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center space-x-2 p-2 mb-16 hover:bg-gray-700 rounded">
          <FiLogOut /> <span>Logout</span>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/add-product" className="w-full">
            <div className="bg-pink-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">  
              <FiPlusCircle className="text-4xl mb-2" />
              <h3 className="text-lg font-bold">Add Product</h3>
              <button className="mt-4 px-4 py-2 bg-white text-gray-800 rounded-md shadow-md hover:bg-gray-200">More info</button>
            </div>
          </Link>
          <Link to="/products" className="w-full">
            <div className="bg-pink-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">  
              <FiBox className="text-4xl mb-2" />
              <h3 className="text-lg font-bold">View Products</h3>
              <button className="mt-4 px-4 py-2 bg-white text-gray-800 rounded-md shadow-md hover:bg-gray-200">More info</button>
            </div>
          </Link>
          <Link to="/cart" className="w-full">
            <div className="bg-pink-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">  
              <FiShoppingCart className="text-4xl mb-2" />
              <h3 className="text-lg font-bold">View Orders</h3>
              <button className="mt-4 px-4 py-2 bg-white text-gray-800 rounded-md shadow-md hover:bg-gray-200">More info</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
