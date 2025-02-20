import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Navbar = () => {
    const [userType, setUserType] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserType = () => {
            const authToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('Authtoken'))
                ?.split('=')[1];
            if (authToken) {
                const decoded = jwtDecode(authToken);
                return decoded.userType;
            }
            return null;
        };
        setUserType(getUserType());
    }, []);

    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
            method: "GET",
            credentials: "include",
        });
        toast.success("Logged out successfully");
        navigate("/");
    };

    return (
        <nav className="bg-pink-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold flex items-center">
                    MedCart
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-10 font-bold">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Medicines</Link></li>
                    <li><Link to="/profile">My Cart</Link></li>
                    {userType === 'admin' && (
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    )}
                </ul>

                {/* User Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {userType ? (
                        <button onClick={handleLogout} className="flex items-center text-white px-2 py-2 font-semibold transition-all">
                            <AiOutlineUser className="mr-2" /> Logout
                        </button>
                    ) : (
                        <Link to="/register" className="flex items-center text-white px-2 py-2 font-semibold transition-all">
                            <AiOutlineUser className="mr-2" /> Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-pink-700 text-white p-4 mt-2">
                    <ul className="space-y-4 text-center">
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link to="/products" onClick={() => setMenuOpen(false)}>Medicines</Link></li>
                        <li><Link to="/cart" onClick={() => setMenuOpen(false)}>My Cart</Link></li>
                        {userType === 'admin' && (
                            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                        )}
                    </ul>
                    <div className="mt-4 text-center">
                        {userType ? (
                            <button onClick={handleLogout} className="text-white font-semibold" >
                                <AiOutlineUser className="inline-block mr-2" /> Logout
                            </button>
                        ) : (
                            <Link to="/register" className="text-white font-semibold">
                                <AiOutlineUser className="inline-block mr-2" /> Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
