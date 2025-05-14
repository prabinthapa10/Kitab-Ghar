import { useEffect, useState } from "react";
import axios from "axios";

const YourComponent = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("https://localhost:7195/api/Review");
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []); // Run only once on mount

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-2">
            <p className="font-semibold">{review.user}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
            <p className="text-yellow-500">Rating: {review.rating} / 5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default YourComponent;
