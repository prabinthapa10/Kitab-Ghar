import { useState } from "react";
import { Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Takma",
      price: 250_000,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeItem = id =>
    setCartItems(items => items.filter(item => item.id !== id));

  const subtotal = item => item.price * item.quantity;
  const total = cartItems.reduce((sum, item) => sum + subtotal(item), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto mt-8 px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Table */}
          <section className="md:w-2/3 overflow-x-auto">
            <div className="bg-[#f9f3e9] p-4 grid grid-cols-4 font-medium min-w-[640px]">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Subtotal</span>
            </div>

            {cartItems.map(item => (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center py-4 border-b min-w-[640px]"
              >
                {/* Product */}
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-gray-700">{item.name}</span>
                </div>

                {/* Price */}
                <span className="text-center text-gray-700">
                  Rs. {item.price.toLocaleString()}
                </span>

                {/* Quantity */}
                <div className="flex justify-center">
                  <input
                    aria-label={`Quantity of ${item.name}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-12 h-8 border text-center"
                  />
                </div>

                {/* Subtotal + Remove */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    Rs. {subtotal(item).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-amber-600 hover:text-amber-800"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Cart Totals */}
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
