import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/products";

const ProductDetail = () => {
    const { id } = useParams();
    const [userType, setUserType] = useState(null);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState('');
    const navigate =useNavigate()

    useEffect(() => {
        const getUserType = () => {
            try {
                const authToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('Authtoken='))
                    ?.split('=')[1];

                if (authToken) {
                    const decoded = jwtDecode(authToken);
                    return decoded.userType;
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
            return null;
        };

        setUserType(getUserType());
    }, []);

    const cartAdding = async () => {
        if (!quantity || Number(quantity) <= 0) {
            console.log('Please enter a valid quantity.');
            return;
        }
    
        if (Number(quantity) > product.productQuantity) {
            console.log('Quantity exceeds available stock!');
            return;
        }
    
        try {
            const authToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('Authtoken='))
                ?.split('=')[1];
    
            console.log("Auth Token:", authToken);
    
            if (!authToken) {
                console.log('User not authenticated.');
                return;
            }
    
            const decoded = jwtDecode(authToken);
            console.log("Decoded Token:", decoded);
    
            const userId = decoded.userId || decoded.id || decoded.sub;
            if (!userId) {
                console.log("Invalid user token.");
                return;
            }
    
            console.log("User ID (Frontend):", userId);
    
            const requestBody = {
                userId,
                productId: id,
                quantity: Number(quantity)
            };
    
            console.log("Request Body Sent to Backend:", requestBody);
    
            const res = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(requestBody)
            });
    
            const data = await res.json();
            console.log("Backend Response:", data);
    
            if (!res.ok) {
                console.log(data.message || 'Failed to add product to cart.');
                return;
            }
    
            toast.success('Product added to cart successfully!');
            navigate('/cart-page');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            console.log('Something went wrong while adding to cart.');
        }
    };
    

    const deleteProduct = async () => {
        const confirm = window.confirm("Sure want to delete?!");
        if (!confirm) return;

        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    },
                credentials:"include"
            });

            if (res.ok) {
                navigate("/products");
            } else {
                console.error('Failed to delete product:', await res.json());
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error("Error fetching product:", error));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-32">
            <h2 className="text-2xl font-semibold">{product.productName}</h2>
            <p className="text-gray-600 mt-2">{product.productDescription}</p>
            <p className="text-xl font-bold mt-4">Price: ${product.productPrice}</p>
            <p className="mt-2">Quantity Available: {product.productQuantity}</p>

            {userType === "admin" ? (
                <div className="mt-4 flex space-x-4">
                    <Link to={`/edit-product/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
                    <button onClick={deleteProduct} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            ) : userType === "user" ? (
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium">Enter Quantity:</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        className="border p-2 w-full rounded" 
                        max={product.productQuantity} 
                    />
                    <button onClick={cartAdding} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
                </div>
            ) : (
                <p className="mt-4 text-gray-500">Loading user permissions...</p>
            )}
        </div>
    );
};

const productLoader = async ({ params }) => {
    const res = await fetch(`http://localhost:5000/products/${params.id}`);
    const data = await res.json();
    return data;
};

export { ProductDetail as default, productLoader };
