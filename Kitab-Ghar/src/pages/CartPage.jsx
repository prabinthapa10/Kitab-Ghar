import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");

      // Step 1: Fetch cart items
      const cartRes = await axios.get("https://localhost:7195/api/CartItem", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = cartRes.data;

      // Step 2: Fetch book details for each cart item
      const enrichedItems = await Promise.all(
        items.map(async (item) => {
          try {
            const bookRes = await axios.get(
              `https://localhost:7195/api/Books/${item.bookId}`
            );
            return {
              ...item,
              book: bookRes.data,
            };
          } catch (err) {
            console.error("Error fetching book", item.bookId, err);
            return item;
          }
        })
      );

      setCartItems(enrichedItems);
    } catch (err) {
      console.error("Error fetching cart items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`https://localhost:7195/api/CartItem/${id}`, {
        ...cartItems.find((item) => item.id === id),
        quantity,
      });
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
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

  const subtotal = (item) => item.book?.price * item.quantity;
  const total = cartItems.reduce(
    (sum, item) => sum + (item.book?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto mt-8 px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-6">
          <section className="md:w-2/3 overflow-x-auto">
            <div className="bg-[#f9f3e9] p-4 grid grid-cols-4 font-medium min-w-[640px]">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Subtotal</span>
            </div>

            {loading ? (
              <p className="p-4">Loading cart items...</p>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center py-4 border-b min-w-[640px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 overflow-hidden">
                      <img
                        src={
                          item.book?.image ||
                          "/placeholder.svg?height=80&width=80"
                        }
                        alt={item.book?.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-gray-700">{item.book?.title}</span>
                  </div>

                  <span className="text-center text-gray-700">
                    Rs. {item.book?.price?.toLocaleString()}
                  </span>

                  <div className="flex justify-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 h-8 border text-center"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Rs. {subtotal(item)?.toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-amber-600 hover:text-amber-800"
                      aria-label={`Remove ${item.book?.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
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

              <button className="w-full border border-gray-300 rounded py-3 px-4 hover:bg-gray-50 transition">
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
