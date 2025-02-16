import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

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
                    navigate("/products"); // ✅ Redirect users
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <Link to="/signup" className="text-green-700 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
