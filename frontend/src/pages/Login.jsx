import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react"; // Importing icons

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data = await res.json(); // Ensure data is assigned before checking

            if (res.ok) {
                toast.success(data.message);

                console.log("User Type:", data.userType); // Debugging userType

                if (data.userType === "admin") {
                    navigate("/dashboard"); // ✅ Redirect admins
                } else if (data.userType === "user") {
                    navigate("/profile"); // ✅ Redirect users
                } else {
                    toast.error("Invalid user type received.");
                }
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error("Network error. Try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Redirect */}
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-pink-700 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
