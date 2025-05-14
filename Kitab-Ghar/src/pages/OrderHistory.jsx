import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const OrderHistory = () => {
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

    if (user?.userId) fetchUserOrders();
  }, [user]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`https://localhost:7195/api/Order/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error("Failed to delete order:", err);
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
      bookId: "1",
      userId: user.userId,
      rating: parseInt(review.rating),
      comment: review.comment.trim(),
    };

    console.log("Review Payload:", payload);

    try {
      await axios.post("https://localhost:7195/api/Reviews", payload);
      toast.success("Review submitted successfully!");
      closeReviewModal(); // if you want to hide the modal
    } catch (error) {
      console.error(
        "Review submission failed:",
        error.response?.data || error.message
      );
      toast.error("Failed to submit review. Check the console for details.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-300 p-4 mb-4 rounded relative"
        >
          <button
            onClick={() => handleDeleteOrder(order.id)}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.totalAmount}
          </p>

          <h4 className="mt-2 font-semibold">Books:</h4>
          <ul>
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mt-1"
              >
                <span>
                  {item.book.title} × {item.quantity}
                </span>
                <button
                  onClick={() => openReviewModal(item)}
                  className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Review
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeReviewModal}
        className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
      >
        <h2 className="text-xl mb-4">Review for {selectedBook?.book?.title}</h2>
        <label className="block mb-2">
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Comment:
          <textarea
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </label>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={submitReview}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            onClick={closeReviewModal}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderHistory;
