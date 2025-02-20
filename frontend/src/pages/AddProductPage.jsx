import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()

    const newProduct = {
      productName,
      productDescription,
      productPrice,
      productQuantity
    }

    const res = addProduct(newProduct)
    console.log('Product added successfully')
    navigate('/products')
    console.log(res)
  }

  const addProduct = async (newProduct) => {
    const res = await fetch('http://localhost:5000/api/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:"include",
      body: JSON.stringify(newProduct)
    })
    return res;
  }

  return (
    <>
      <section className="bg-pink-50 ">
        <div className="container m-auto max-w-xl py-2">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-pink-800 text-center font-semibold mb-6">
                Add Product
              </h2>

        

                

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Quantity
                </label>
                <input
                  type="text"
                  id="productQuantity"
                  name="productQuantity"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Small description on the product"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>

              </div>


              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Price
                </label>
                <input
                  type="Number"
                  id="productPrice"
                  name="productPrice"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />

              </div>

             

              <div>
                <button
                  className="bg-pink-500 hover:bg-pink-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProductPage;