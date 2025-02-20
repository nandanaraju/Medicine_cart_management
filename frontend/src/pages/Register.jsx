import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Users } from "lucide-react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password, userType };

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                navigate("/login");
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Network error. Try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border rounded p-2 bg-gray-50">
                        <User className="text-gray-500 mr-2" size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-transparent focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded p-2 bg-gray-50">
                        <Mail className="text-gray-500 mr-2" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded p-2 bg-gray-50">
                        <Lock className="text-gray-500 mr-2" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded p-2 bg-gray-50">
                        <Users className="text-gray-500 mr-2" size={20} />
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full bg-transparent focus:outline-none"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <Link to="/login" className="text-pink-700 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
