import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure you have jwt-decode installed


const CartPage = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);


const fetchCart = async () => {
    try {
        // Extract auth token from cookies
        const authToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('Authtoken='))
            ?.split('=')[1];

        if (!authToken) {
            console.log('User not authenticated.');
            return;
        }

        // Decode the JWT to extract user ID
        const decoded = jwtDecode(authToken);
        const userId = decoded.userId || decoded.id || decoded.sub;
        
        if (!userId) {
            console.log("Invalid user token.");
            return;
        }

        console.log("User ID (Frontend):", userId);

        // Fetch cart data
        const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Ensures cookies are sent with the request
        });

        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();

        // Format the cart data
        const formattedCart = data.map((item) => ({
            productId: item.Product?.id,
            productName: item.Product?.productName,
            productPrice: item.Product?.productPrice,
            quantity: item.quantity,
        }));

        setCart(formattedCart);
        calculateTotal(formattedCart);
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
};


  const handleQuantityChange = async (productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      if (!response.ok) throw new Error("Failed to update quantity");
      fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) throw new Error("Failed to remove item");
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = (cart) => {
    let newTotal = cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    setTotal(newTotal);
  };

  return (
    <>
      <main className="container mx-auto mt-8">
        <section className="text-center">
          <h2 className="text-4xl mb-4 font-bold text-blue-600">Shopping Cart</h2>
          <div className="bg-white p-8 rounded shadow-lg w-3/4 mx-auto mt-16">
            <table className="min-w-full">
              <thead>
                <tr className="w-full bg-gray-100">
                  <th className="py-2 bg-blue-500 text-white">Items</th>
                  <th className="py-2 bg-blue-500 text-white">Rate</th>
                  <th className="py-2 bg-blue-500 text-white">Quantity</th>
                  <th className="py-2 bg-blue-500 text-white">Total</th>
                  <th className="py-2 bg-blue-500 text-white">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId}>
                    <td className="py-2">{item.productName}</td>
                    <td className="py-2">₹ {item.productPrice}</td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        className="border p-1 w-16 text-center"
                      />
                    </td>
                    <td className="py-2">₹ {item.productPrice * item.quantity}</td>
                    <td className="py-2 text-center">
                      <button className="text-rose-600 px-4 py-2 rounded" onClick={() => handleRemove(item.productId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <p className="font-bold">Total: ₹ {total}</p>
            </div>
            <div className="flex mt-4 justify-center gap-6">
              <Link to="/products" className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow mt-4 inline-block">
                Back to Products
              </Link>
              <Link to="/checkout" className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow mt-4 inline-block">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-16 text-center text-gray-500">© 2024 Carewell Pharmacy. All rights reserved.</footer>
    </>
  );
};

export default CartPage;
