import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!user?.userId) {
        throw new Error("User not logged in.");
      }

      const cartRes = await axios.get("https://localhost:7195/api/Cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const carts = cartRes.data;
      const userCart = carts.find((cart) => cart.userId === user.userId);

      if (!userCart) {
        console.warn(`No cart found for user ID: ${user.userId}`);
        setCartItems([]);
        return;
      }

      const cartItemRes = await axios.get(
        "https://localhost:7195/api/CartItem",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allItems = cartItemRes.data;

      const userCartItems = allItems.filter(
        (item) => item.cartId === userCart.id
      );

      const enrichedItems = await Promise.all(
        userCartItems.map(async (item) => {
          try {
            const bookRes = await axios.get(
              `https://localhost:7195/api/Books/${item.bookId}`
            );
            return {
              ...item,
              book: bookRes.data,
            };
          } catch (err) {
            console.error(`Error fetching book ID ${item.bookId}:`, err);
            return item;
          }
        })
      );

      setCartItems(enrichedItems);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      const itemToUpdate = cartItems.find((item) => item.id === id);
      await axios.put(`https://localhost:7195/api/CartItem/${id}`, {
        ...itemToUpdate,
        quantity,
      });
      setCartItems((items) =>
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`https://localhost:7195/api/CartItem/${id}`);
      setCartItems((items) => items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const Checkout = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderRes = await fetch("https://localhost:7195/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          status: "Pending",
          totalAmount: parseFloat(total.toFixed(2)),
          date: new Date().toISOString(),
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const order = await orderRes.json();

      for (const item of cartItems) {
        await fetch("https://localhost:7195/api/OrderItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId: item.bookId,
            quantity: item.quantity,
            orderId: order.id,
          }),
        });
      }

      for (const item of cartItems) {
        await fetch(`https://localhost:7195/api/CartItem/${item.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success("Order placed successfully!");
      setCartItems([]);
      navigate(`/orderSuccess/${order.id}`);
    } catch (err) {
      console.error("Checkout failed", err);
      toast.error("Checkout failed");
    }
  };

  const subtotal = (item) => {
    const price = item.book?.discountedPrice ?? item.book?.price ?? 0;
    return price * item.quantity;
  };

  const total = cartItems.reduce((sum, item) => sum + subtotal(item), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto mt-8 px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-6">
          <section className="md:w-2/3 overflow-x-auto">
            <div className="bg-[#f9f3e9] p-4 grid grid-cols-5 font-medium min-w-[740px] text-sm md:text-base">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Subtotal</span>
              <span className="text-center">Action</span>
            </div>

            {loading ? (
              <p className="p-4">Loading cart items...</p>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => {
                const price =
                  item.book?.discountedPrice ?? item.book?.price ?? 0;
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-5 items-center py-4 border-b min-w-[740px]"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 overflow-hidden rounded border">
                        <img
                          src={
                            item.book?.image ||
                            "/placeholder.svg?height=80&width=80"
                          }
                          alt={item.book?.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {item.book?.title}
                      </span>
                    </div>

                    {/* Price */}
                    <span className="text-center text-gray-700 font-semibold">
                      Rs. {price.toLocaleString()}
                    </span>

                    {/* Quantity Input */}
                    <div className="flex justify-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-14 h-9 border rounded text-center"
                      />
                    </div>

                    {/* Subtotal */}
                    <span className="text-center text-gray-700 font-medium">
                      Rs. {subtotal(item)?.toLocaleString()}
                    </span>

                    {/* Action (Delete Button) */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        aria-label={`Remove ${item.book?.title}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="p-4">Your cart is empty.</p>
            )}
          </section>

          <aside className="md:w-1/3">
            <div className="bg-[#f9f3e9] p-6 rounded">
              <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>

              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span className="text-gray-700">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between mb-6">
                <span>Total</span>
                <span className="text-amber-600 font-medium">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <button
                className="w-full border border-gray-300 rounded py-3 px-4 hover:bg-gray-50 transition"
                onClick={Checkout}
              >
                Check Out
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
