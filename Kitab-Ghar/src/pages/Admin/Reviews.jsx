"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle } from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "./AdminSidebar";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [bookMap, setBookMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://localhost:7195/api/Reviews");
        const reviewData = res.data;
        setReviews(reviewData);
        setError(null);

        // Get unique IDs
        const userIds = [...new Set(reviewData.map((r) => r.userId))];
        const bookIds = [...new Set(reviewData.map((r) => r.bookId))];

        // Fetch user names
        const tempUserMap = {};
        await Promise.all(
          userIds.map(async (id) => {
            try {
              const userRes = await axios.get(
                `https://localhost:7195/api/Users/${id}`
              );
              tempUserMap[id] = userRes.data.name;
            } catch {
              tempUserMap[id] = "Unknown User";
            }
          })
        );
        setUserMap(tempUserMap);

        // Fetch book titles
        const tempBookMap = {};
        await Promise.all(
          bookIds.map(async (id) => {
            try {
              const bookRes = await axios.get(
                `https://localhost:7195/api/Books/${id}`
              );
              tempBookMap[id] = bookRes.data.title;
            } catch {
              tempBookMap[id] = "Unknown Book";
            }
          })
        );
        setBookMap(tempBookMap);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="text-sm text-gray-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] bg-red-50 p-6 flex items-center justify-center rounded-lg">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Customer Reviews
        </h2>

        {reviews.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Book</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Comment</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{userMap[review.userId]}</td>
                    <td className="px-4 py-3 italic">
                      {bookMap[review.bookId]}
                    </td>
                    <td className="px-4 py-3 font-semibold text-amber-600">
                      {review.rating}/5
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {review.comment}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(review.reviewDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
            No reviews yet. Be the first to leave a review!
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
