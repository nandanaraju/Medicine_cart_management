import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="container mx-auto mt-20 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Available Medicines</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="border rounded-lg shadow-lg p-4 bg-white">
                        <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold text-lg mb-1">{product.productName}</h3>
                            <p className="text-sm text-gray-400">{product.productDescription}</p>

                            <p className="text-sm line-through text-gray-400">MRP ₹</p>
                            <p className="text-lg font-bold text-black">
                                ₹{product.productPrice} 
                                <span className="text-sm text-pink-600 bg-pink-100 px-2 py-1 rounded ml-2">
                                    15% off
                                </span>
                            </p>
                        </Link>
                        <Link 
                            to={`/product/${product.id}`}
                            className="mt-3 w-full bg-pink-600 text-white py-2 rounded flex items-center justify-center gap-2"
                        >
                            🛒 Add to cart
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
