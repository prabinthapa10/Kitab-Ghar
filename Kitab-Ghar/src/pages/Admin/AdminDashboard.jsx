import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import RecentOrders from "./RecentOrders";
import axios from "axios";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, bookRes, orderRes] = await Promise.all([
          axios.get("https://localhost:7195/api/Users"),
          axios.get("https://localhost:7195/api/Books"),
          axios.get("https://localhost:7195/api/Order"),
        ]);

        setUserCount(userRes.data.length);
        setBookCount(bookRes.data.length);
        setOrderCount(orderRes.data.length);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Books", value: bookCount, change: "+12%" },
    { title: "Total Orders", value: orderCount, change: "+5.2%" },
    { title: "Active Users", value: userCount, change: "+9.1%" },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div
        style={{ display: "flex", padding: "2rem", gap: "2rem", width: "100%" }}
      >
        {/* Left section (cards + orders) */}
        <div style={{ flex: 3 }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Dashboard
          </h1>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    marginBottom: "0.5rem",
                  }}
                >
                  {card.title}
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {card.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "gray" }}>
                  {card.change} from last month
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              background: "white",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Recent Orders
            </h2>
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
