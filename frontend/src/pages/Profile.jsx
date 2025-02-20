import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Helper function to get userId from JWT
    const getUserIdFromToken = () => {
        try {
            const authToken = document.cookie
                .split("; ")
                .find(row => row.startsWith("Authtoken="))
                ?.split("=")[1];

            if (!authToken) {
                console.log("User not authenticated.");
                return null;
            }

            const decoded = jwtDecode(authToken);
            return decoded.userId || decoded.id || decoded.sub;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    useEffect(() => {
        const userId = getUserIdFromToken();
        if (!userId) return;

        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setUser(data.user);
                setCart(data.cart);
            } catch (err) {
                console.error('Error fetching profile:', err);
                toast.error('An error occurred while fetching profile data');
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('https://img.freepik.com/free-photo/clipboard-with-pills-copy-space_23-2148551018.jpg?t=st=1723350442~exp=1723354042~hmac=b3eb54acca52abd2e2cde52bba106a74fc4791bd41477598bcb87954f100949a&w=1060')" }}>
            <main className="container mx-auto mt-2 p-4">
                <section className="rounded-lg p-8 bg-opacity-75 shadow-lg">
                    <div className="flex items-center justify-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-8">
                        {/* Order History */}
                        <div className="w-full sm:w-1/2 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order History</h3>
                            {cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <p className="text-lg"><strong>Product Name:</strong> {item.Product?.productName || 'N/A'}</p>
                                        <p className="text-lg"><strong>Price:</strong> ₹{item.Product?.productPrice || 'N/A'}</p>
                                        <p className="text-lg"><strong>Quantity:</strong> {item.quantity || 'N/A'}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No orders found</p>
                            )}
                        </div>

                        {/* Personal Details */}
                        <div className="w-full sm:w-1/2 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold  mb-4 text-gray-800">Personal Details</h3>
                            {user ? (
                                <>
                                    <p className="text-lg mb-2"><strong>Name:</strong> {user.username || 'N/A'}</p>
                                    <p className="text-lg mb-2"><strong>Email:</strong> {user.email || 'N/A'}</p>
                                </>
                            ) : (
                                <p>Loading user details...</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <Link to="/products" className="bg-pink-500 text-white px-6 py-3 rounded-full shadow hover:bg-pink-600">
                            Continue Shopping
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;
