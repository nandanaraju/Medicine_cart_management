import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const ProductDetail = () => {
    const { id } = useParams();
    const [userType, setUserType] = useState(null);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState('');

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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            ) : (
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium">Enter Quantity:</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        className="border p-2 w-full rounded" 
                        max={product.productQuantity} 
                    />
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
                </div>
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
