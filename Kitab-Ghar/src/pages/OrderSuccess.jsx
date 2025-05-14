"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Book,
  Printer,
  ShoppingBag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function OrderSuccess() {
  const params = useParams();
  const orderId = params.orderId;
  const { user, email } = useAuth();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(true);

  console.log("em", email);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderRes = await axios.get(
          `https://localhost:7195/api/Order/${orderId}`
        );
        setOrder(orderRes.data);

        const itemsRes = await axios.get(
          `https://localhost:7195/api/OrderItem/${orderId}`
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
        setOrderItems(enrichedItems);
      } catch (err) {
        console.error("Failed to load order details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const handlePrintReceipt = async () => {
    try {
      if (!user?.userId) throw new Error("User not logged in.");

      const subject = "Your Order Details";
      const date = new Date().toISOString().split("T")[0].replace(/-/g, "");

      const userEmail = user.email;

      // ✅ Fix: use user.userId, not undefined variable
      const redeemCode = `${user.userId}-${orderId}-${date}`;

      const body = `
            Thank you for your order!

            Order ID: ${orderId}
            User ID: ${user.userId}

            Order Summary:
            ${orderItems
              .map(
                (item, i) =>
                  `${i + 1}. ${item.book?.title || "Unknown"} - Qty: ${
                    item.quantity
                  }`
              )
              .join("\n")}

            Redeem Code: ${redeemCode}
        `;

      console.log("orderId:", orderId);
      console.log("userId:", user.userId);
      console.log("Sending email with:", { to: userEmail, subject, body });

      const response = await axios.post(
        "https://localhost:7195/api/Email/send",
        {
          to: userEmail,
          subject,
          body,
        }
      );

      if (response.status === 200) {
        alert("Receipt sent to email successfully.");
      } else {
        alert("Failed to send receipt email.");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      alert("An error occurred while sending the email.");
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Order Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the order you're looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 max-w-md">
            Thank you for your purchase. Your books will be on their way soon!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <div className="text-sm text-gray-600">
              Order #{order.id} • Placed on{" "}
              {new Date(order.date).toLocaleString()}
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-gray-500" />
                <span>Order Status</span>
              </div>
              <span className="font-medium">{order.status}</span>
            </div>

            <div className="h-px bg-gray-200 my-4"></div>

            <button
              className="w-full flex items-center justify-between py-2"
              onClick={() => setShowOrderDetails(!showOrderDetails)}
            >
              <span className="font-medium">Order Details</span>
              {showOrderDetails ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {showOrderDetails && (
              <div className="mt-4 space-y-6">
                {/* Books */}
                <div>
                  <h3 className="font-medium mb-3">Books in Your Order</h3>
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="h-32 w-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {item.book.image ? (
                              <img
                                src={item.book.image || "/placeholder.svg"}
                                alt={item.book.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Book className="h-12 w-12 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg">
                              {item.book.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              <strong>Author:</strong> {item.book.author}
                            </p>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {item.book.description}
                            </p>
                            <div className="mt-3 flex justify-between">
                              <span className="text-sm">
                                ₹{item.book.price} × {item.quantity}
                              </span>
                              <span className="font-medium">
                                ₹{(item.book.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Price Details</h3>
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.book.title} (×{item.quantity})
                        </span>
                        <span>
                          ₹{(item.book.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                {order.shippingAddress && (
                  <div>
                    <h3 className="font-medium mb-3">Shipping Address</h3>
                    <p>{order.shippingAddress}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePrintReceipt}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 flex items-center justify-center"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Receipt
            </button>
            <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" />
              Track Order
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/user?tab=history"
            className="px-4 py-2 bg-amber-600 text-white rounded-md text-center hover:bg-amber-500"
          >
            View My Orders
          </Link>

          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 bg-white rounded-md text-center hover:bg-gray-50 flex items-center justify-center sm:inline-flex"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
