import { useEffect, useState } from "react";
import axios from "axios";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7195/api/Order");
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);

        const uniqueUserIds = [...new Set(sortedOrders.map((o) => o.userId))];
        const tempMap = {};

        await Promise.all(
          uniqueUserIds.map(async (userId) => {
            try {
              const res = await axios.get(`https://localhost:7195/api/Users/${userId}`);
              tempMap[userId] = res.data.name;
            } catch {
              tempMap[userId] = "Unknown";
            }
          })
        );

        setUserMap(tempMap);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-6">
      <p className="text-sm text-gray-500 mb-4">
        You have received {orders.length} orders this month
      </p>

      <div className="overflow-auto">
        <table className="w-full border-collapse text-sm text-left rounded-lg shadow">
          <thead className="bg-slate-100 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 10).map((order, index) => (
              <tr key={order.id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-2 font-medium">{order.id}</td>
                <td className="px-4 py-2">
                  {userMap[order.userId] || "Loading"}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Shipped"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">${order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
