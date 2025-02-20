import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productQuantity: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching product:", data.error);
        } else {
          setProduct(data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Product updated successfully", data);
        navigate("/products");
      } else {
        console.error("Update failed:", data.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <section className="bg-pink-50 ">
      <div className="container m-auto max-w-xl py-2">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-pink-800 text-center font-semibold mb-6">
              Edit Product
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                className="border rounded w-full py-2 px-3 mb-2"
                value={product.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Product Quantity</label>
              <input
                type="text"
                name="productQuantity"
                className="border rounded w-full py-2 px-3 mb-2"
                value={product.productQuantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Product Description</label>
              <textarea
                name="productDescription"
                className="border rounded w-full py-2 px-3"
                rows="4"
                value={product.productDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Product Price</label>
              <input
                type="number"
                name="productPrice"
                className="border rounded w-full py-2 px-3"
                value={product.productPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button
                className="bg-pink-500 hover:bg-pink-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProductPage;
