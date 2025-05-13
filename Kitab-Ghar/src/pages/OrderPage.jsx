import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderRes = await fetch(
          `https://localhost:7195/api/Order/${orderId}`
        );
        if (!orderRes.ok) throw new Error("Failed to fetch order");
        const orderData = await orderRes.json();
        setOrder(orderData);

        const itemsRes = await fetch(`https://localhost:7195/api/Order`);
        const allItems = await itemsRes.json();
        const filteredItems = allItems.filter(
          (item) => item.orderId === parseInt(orderId)
        );

        setOrderItems(filteredItems);
      } catch (err) {
        console.error("Error loading order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="p-4">Loading order...</div>;
  if (!order) return <div className="p-4 text-red-500">Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
      </p>
      <p>
        <strong>Date:</strong> {new Date(order.date).toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Items:</h2>
      {orderItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orderItems.map((item) => (
            <li key={item.id} className="py-2">
              <p>
                <strong>Book ID:</strong> {item.bookId}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
