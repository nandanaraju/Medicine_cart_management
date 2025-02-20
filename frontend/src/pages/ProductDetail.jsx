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
    const navigate = useNavigate();

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
            toast.error('Please enter a valid quantity.');
            return;
        }
    
        if (Number(quantity) > product.productQuantity) {
            toast.error('Quantity exceeds available stock!');
            return;
        }
    
        try {
            const authToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('Authtoken='))
                ?.split('=')[1];
    
            if (!authToken) {
                toast.error('User not authenticated.');
                return;
            }
    
            const decoded = jwtDecode(authToken);
            const userId = decoded.userId || decoded.id || decoded.sub;
            if (!userId) {
                toast.error("Invalid user token.");
                return;
            }
    
            const requestBody = {
                userId,
                productId: id,
                quantity: Number(quantity)
            };
    
            const res = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(requestBody)
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                toast.error(data.message || 'Failed to add product to cart.');
                return;
            }
    
            toast.success('Product added to cart successfully!');
            navigate('/cart-page');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Something went wrong while adding to cart.');
        }
    };
    

    const deleteProduct = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if (res.ok) {
                toast.success("Product deleted successfully!");
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

    if (!product) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-pink-100 shadow-lg rounded-lg mt-10 sm:mt-16 md:mt-24 lg:mt-32">
            <h2 className="text-2xl font-semibold text-center sm:text-left">{product.productName}</h2>
            <p className="text-gray-600 mt-2 text-center sm:text-left">{product.productDescription}</p>
            <p className="text-xl font-bold mt-4 text-center sm:text-left">Price: ₹{product.productPrice}</p>
            <p className="mt-2 text-center sm:text-left">Quantity Available: {product.productQuantity}</p>

            {userType === "admin" ? (
                <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 items-center">
                    <Link to={`/edit-product/${id}`} className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded text-center">
                        Edit
                    </Link>
                    <button onClick={deleteProduct} className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">
                        Delete
                    </button>
                </div>
            ) : userType === "user" ? (
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Quantity:</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        className="border p-2 w-full rounded"
                        max={product.productQuantity} 
                    />
                    <button 
                        onClick={cartAdding} 
                        className="mt-4 w-full bg-pink-500 text-white px-4 py-2 rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            ) : (
                <p className="mt-6 text-gray-500 text-center">Loading user permissions...</p>
            )}
        </div>
    );
};

const productLoader = async ({ params }) => {
    const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
    const data = await res.json();
    return data;
};

export { ProductDetail as default, productLoader };
