import React from "react";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const cards = [
    { title: "Total Books", value: "1,248", change: "+12%" },
    { title: "Total Orders", value: "845", change: "+5.2%" },
    { title: "Total Revenue", value: "$24,780", change: "+18.4%" },
    { title: "Active Users", value: "573", change: "+9.1%" },
  ];

  const orders = [
    ["#ORD-7245", "The Great Gatsby", "John Smith", "Delivered", "$24.99"],
    [
      "#ORD-7244",
      "To Kill a Mockingbird",
      "Sarah Johnson",
      "Processing",
      "$19.99",
    ],
    ["#ORD-7243", "1984", "Michael Brown", "Delivered", "$15.99"],
    ["#ORD-7242", "Pride and Prejudice", "Emily Davis", "Shipped", "$12.99"],
    ["#ORD-7241", "The Hobbit", "David Wilson", "Cancelled", "$29.99"],
  ];

  const topSellingBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", sold: 124 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", sold: 98 },
    { title: "1984", author: "George Orwell", sold: 87 },
    { title: "Pride and Prejudice", author: "Jane Austen", sold: 76 },
  ];

  const statusColors = {
    Delivered: "#10b981",
    Processing: "#f59e0b",
    Shipped: "#3b82f6",
    Cancelled: "#ef4444",
  };

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
            <p
              style={{
                fontSize: "0.85rem",
                color: "gray",
                marginBottom: "1rem",
              }}
            >
              You have received 32 orders this month
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Order ID", "Book", "Customer", "Status", "Amount"].map(
                    (head) => (
                      <th
                        key={head}
                        style={{
                          textAlign: "left",
                          padding: "0.5rem",
                          fontSize: "0.85rem",
                          color: "gray",
                        }}
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map(([id, book, customer, status, amount], index) => (
                  <tr key={index}>
                    <td style={{ padding: "0.5rem", fontWeight: "500" }}>
                      {id}
                    </td>
                    <td style={{ padding: "0.5rem" }}>{book}</td>
                    <td style={{ padding: "0.5rem" }}>{customer}</td>
                    <td style={{ padding: "0.5rem" }}>
                      <span
                        style={{
                          backgroundColor: statusColors[status],
                          color: "white",
                          borderRadius: "4px",
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        {status}
                      </span>
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "right" }}>
                      {amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right section (Top Selling Books) */}
        <div style={{ flex: 1 }}>
          <div
            style={{
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
                marginBottom: "0.25rem",
              }}
            >
              Top Selling Books
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "gray",
                marginBottom: "1rem",
              }}
            >
              For the current month
            </p>
            {topSellingBooks.map((book, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                    fontSize: "1.25rem",
                  }}
                >
                  📦
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: "500" }}>{book.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "gray" }}>
                    {book.author}
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                  {book.sold} sold
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
