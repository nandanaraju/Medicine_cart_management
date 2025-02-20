// import { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// const AllCartPage = () => {
//   const [carts, setCarts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCarts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/cart"); // Adjust API URL
//         if (!response.ok) {
//           throw new Error("Failed to fetch cart data");
//         }
//         const data = await response.json();

//         // Add a default 'status' if not provided by the backend
//         const cartsWithStatus = data.map((cart) => ({
//           ...cart,
//           status: cart.status || "To Do", // Default to "To Do" if status is missing
//         }));

//         setCarts(cartsWithStatus);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarts();
//   }, []);

//   const statuses = ["To Do", "Pending", "Confirmed"];

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const updatedCarts = [...carts];
//     const draggedItem = updatedCarts.find((cart) => cart.id === result.draggableId);

//     if (draggedItem) {
//       draggedItem.status = statuses[result.destination.droppableId];
//       setCarts(updatedCarts);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto p-4 mt-16">
//       <h1 className="text-2xl font-bold mb-4 text-center">Medicine Orders</h1>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-3 gap-4">
//           {statuses.map((status, index) => (
//             <Droppable key={status} droppableId={String(index)}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[200px]"
//                 >
//                   <h2 className="text-lg font-bold mb-2 text-center">{status}</h2>
//                   {carts
//                     .filter((cart) => cart.status === status)
//                     .map((cart, index) => (
//                       <Draggable key={cart.id} draggableId={cart.id} index={index}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="bg-white p-2 mb-2 rounded shadow-md"
//                           >
//                             <p className="text-center font-semibold">
//                               Customer Name: {cart.User?.username || "Unknown"}
//                             </p>
//                             <p className="text-center">
//                               Medicine Name: {cart.Product?.productName || "Unknown"}
//                             </p>
//                             <p className="text-center">Qty: {cart.quantity}</p>
//                             <p className="text-center text-sm text-gray-500">
//                               Status: {cart.status}
//                             </p> 
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default AllCartPage;

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaUser, FaPills } from "react-icons/fa";
import { AiOutlineClockCircle, AiOutlineSync, AiOutlineCheckCircle } from "react-icons/ai";

const AllCartPage = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();

        const cartsWithStatus = data.map((cart) => ({
          ...cart,
          status: cart.status || "To Do",
        }));

        setCarts(cartsWithStatus);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  const statuses = ["To Do", "Pending", "Confirmed"];
  const statusIcons = {
    "To Do": <AiOutlineClockCircle className="text-yellow-600 text-lg" />,
    "Pending": <AiOutlineSync className="text-blue-600 text-lg animate-spin" />,
    "Confirmed": <AiOutlineCheckCircle className="text-green-600 text-lg" />,
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedCarts = [...carts];
    const draggedItem = updatedCarts.find((cart) => cart.id === result.draggableId);

    if (draggedItem) {
      const newStatus = statuses[result.destination.droppableId];

      try {
        const response = await fetch("http://localhost:5000/api/cart/update-status", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: draggedItem.id, status: newStatus }),
        });

        if (!response.ok) {
          throw new Error("Failed to update cart status");
        }

        draggedItem.status = newStatus;
        setCarts(updatedCarts);
      } catch (error) {
        console.error("Error updating cart status:", error);
      }
    }
  };

  if (loading) return <p className="text-lg text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
        Medicine Orders
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statuses.map((status, index) => (
            <Droppable key={status} droppableId={String(index)}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 overflow-hidden"
                >
                  <h2 className="text-xl font-bold mb-4 text-gray-700 text-center uppercase tracking-wide">
                    {status}
                  </h2>
                  {carts
                    .filter((cart) => cart.status === status)
                    .map((cart, index) => (
                      <Draggable key={cart.id} draggableId={cart.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-5 mb-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-move border-2 border-pink-300"
                          >
                            <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                              <FaUser className="text-gray-600" /> {cart.User?.username || "Unknown"}
                            </p>
                            <p className="text-md text-gray-600 flex items-center gap-2">
                              <FaPills className="text-pink-600" /> Medicine:{" "}
                              <span className="font-medium">{cart.Product?.productName || "Unknown"}</span>
                            </p>
                            <div className="flex justify-between items-center mt-3">
                              <p className="text-md text-gray-700 font-medium">
                                Qty: <span className="text-gray-800 font-semibold">{cart.quantity}</span>
                              </p>
                              <div className="flex items-center gap-2">
                                {statusIcons[cart.status]}
                                <span className="text-md font-semibold text-gray-700">{cart.status}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default AllCartPage;
