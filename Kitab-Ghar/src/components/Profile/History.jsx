import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const History = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [review, setReview] = useState({ rating: "", comment: "" });

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7195/api/Order/user/${user.userId}`
        );
        const orderList = Array.isArray(res.data) ? res.data : [];

        const detailedOrders = await Promise.all(
          orderList.map(async (order) => {
            const itemsRes = await axios.get(
              `https://localhost:7195/api/OrderItem/ByOrder/${order.id}`
            );
            const enrichedItems = await Promise.all(
              itemsRes.data.map(async (item) => {
                const bookRes = await axios.get(
                  `https://localhost:7195/api/Books/${item.bookId}`
                );
                return { ...item, book: bookRes.data };
              })
            );
            return { ...order, items: enrichedItems };
          })
        );

        setOrders(detailedOrders);
      } catch (error) {
        console.error("Failed to fetch order history", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) fetchUserOrders();
  }, [user]);

  const handleDeleteOrder = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      await axios.delete(`https://localhost:7195/api/Order/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      toast.success("Order deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete order");
    }
  };

  const openReviewModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
    setReview({ rating: "", comment: "" });
    setSelectedBook(null);
  };

  const submitReview = async () => {
    const payload = {
      bookId: selectedBook.book.id,
      userId: user.userId,
      rating: parseInt(review.rating),
      comment: review.comment.trim(),
    };

    try {
      await axios.post("https://localhost:7195/api/Reviews", payload);
      toast.success("Review submitted successfully!");
      closeReviewModal();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit review");
    }
  };

  if (loading) return <div className="text-center py-10">Loading your orders...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl p-6 mb-6 shadow-sm relative"
          >
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="absolute top-4 right-4 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>

            <div className="mb-4">
              <p>
                <span className="font-medium">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-medium">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-medium">Total:</span> ₹{order.totalAmount}
              </p>
            </div>

            <h4 className="font-semibold mb-2">Books:</h4>
            <ul className="space-y-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border px-4 py-2 rounded"
                >
                  <div>
                    <p className="font-medium">{item.book.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => openReviewModal(item)}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Write Review
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {/* Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeReviewModal}
        className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">
          Review: {selectedBook?.book?.title}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Comment</label>
            <textarea
              rows="4"
              value={review.comment}
              onChange={(e) => setReview({ ...review, comment: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Write your thoughts about the book..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={submitReview}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              onClick={closeReviewModal}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default History;
