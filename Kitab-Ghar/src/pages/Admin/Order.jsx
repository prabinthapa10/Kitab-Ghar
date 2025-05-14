import { Link } from "react-router-dom";
import { Search, Filter, Download } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7195/api/Order");
        const orderData = response.data;
        setOrders(orderData);

        // Get unique userIds
        const uniqueUserIds = [
          ...new Set(orderData.map((order) => order.userId)),
        ];

        // Fetch usernames for each userId
        const userMapTemp = {};
        console.log(uniqueUserIds)
        await Promise.all(
          uniqueUserIds.map(async (userId) => {
            try {
              const userRes = await axios.get(
                `https://localhost:7195/api/Users/${userId}`
              );
              userMapTemp[userId] = userRes.data.name;
            } catch (err) {
              console.error(`Error fetching user ${userId}:`, err);
              userMapTemp[userId] = "Unknown";
            }
          })
        );

        setUserMap(userMapTemp);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search orders..."
              className="pl-10 pr-3 py-2 w-full border rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <select className="bg-white border rounded-md py-2 px-3 w-full sm:w-[160px] focus:ring-amber-500 focus:border-amber-500">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

            <select className="bg-white border rounded-md py-2 px-3 w-full sm:w-[160px] focus:ring-amber-500 focus:border-amber-500">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Highest Amount</option>
              <option>Lowest Amount</option>
            </select>

            <button className="border rounded-md p-2 bg-white hover:bg-gray-100">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-gray-700 font-medium">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="border p-2">
                    {userMap[order.userId] || "Loading..."}
                  </td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {order.totalAmount}
                  </td>
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/orders/${order.id}`}>
                      <button className="text-sm text-amber-600 hover:underline">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Showing <strong>1</strong> to <strong>10</strong> of{" "}
            <strong>42</strong> orders
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded-md bg-white text-gray-400 cursor-not-allowed"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md bg-slate-100 text-gray-900">
              1
            </button>
            <button className="px-3 py-1 border rounded-md bg-white hover:bg-slate-50">
              2
            </button>
            <button className="px-3 py-1 border rounded-md bg-white hover:bg-slate-50">
              3
            </button>
            <button className="px-3 py-1 border rounded-md bg-white hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
