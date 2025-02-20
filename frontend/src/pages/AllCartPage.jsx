import { useEffect, useState } from "react";

const AllCartPage = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart"); // Adjust API URL
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();
        setCarts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4 text-center"> Medicine Orders </h1>
      {carts.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-pink-200">
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Medicine Name</th>
              <th className="p-2 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr key={cart.id} className="border">
                <td className="p-2 border text-center">{cart.User.username}</td>
                <td className="p-2 border text-center">
                  {cart.Product ? cart.Product.productName : "Unknown"}
                </td>
                <td className="p-2 border text-center">{cart.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllCartPage;
