import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineMedicineBox, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gradient-to-r from-green-700 to-green-900 text-white py-4 px-6 shadow-lg fixed w-full top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center text-2xl font-extrabold tracking-wide"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-white">MedCart</span>
          <span className=""> Pharmacy</span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          {[
            { to: "/", label: "Home", icon: <AiOutlineHome /> },
            { to: "/medicine", label: "Medicine", icon: <AiOutlineMedicineBox /> },
            { to: "/store-locator", label: "Store Locator", icon: <FaMapMarkerAlt /> },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, color: "#FACC15" }}
              transition={{ duration: 0.2 }}
            >
              <Link to={item.to} className="flex items-center space-x-2 hover:text-white hover:underline transition-all">
                {item.icon} <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* User & Cart */}
        <div className="flex space-x-4">
          <Link
          to="/register"
            className="flex items-center text-white px-2 py-2 r font-semibold   transition-all"
            whileHover={{ scale: 1.05 }}
            
          >
            <AiOutlineUser className="mr-2" /> Sign In
          </Link>
          <motion.button
            className="flex items-center text-white px-2 py-2 r font-semibold   transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <AiOutlineShoppingCart className="mr-2" /> Cart
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
