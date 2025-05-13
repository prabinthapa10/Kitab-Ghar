import { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId"); // or from context, auth, etc.

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7195/api/Order/${userId}`
        );

        // Ensure the response is an array
        const orderList = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];

        // Fetch order items + book data for each order
        const detailedOrders = await Promise.all(
          orderList.map(async (order) => {
            const itemsRes = await axios.get(
              `https://localhost:7195/api/OrderItem/${order.id}`
            );

            const enrichedItems = await Promise.all(
              itemsRes.data.map(async (item) => {
                const bookRes = await axios.get(
                  `https://localhost:7195/api/Books/${item.bookId}`
                );
                return {
                  ...item,
                  book: bookRes.data,
                };
              })
            );

            return {
              ...order,
              items: enrichedItems,
            };
          })
        );

        setOrders(detailedOrders);
      } catch (error) {
        console.error("Failed to fetch order history", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserOrders();
    }
  }, [userId]);

  if (loading) return <div>Loading order history...</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 My Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            marginBottom: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.date).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}
          </p>
          <h4>📚 Books:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.book.title} × {item.quantity} - ₹
                {(item.book.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
