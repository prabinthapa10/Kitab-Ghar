import React, { useState, useEffect } from "react";
import BookDescriptionPage from "../../pages/BookDescriptionPage";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Wishlist = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useAuth();

  useEffect(() => {
    // Fetch favorite books from the API
    const fetchFavoriteBooks = async () => {
      try {
        const response = await fetch(
          `https://localhost:7195/api/Bookmark/user/${id}`
        );

        // Check if the response is successful (status 200-299)
        if (!response.ok) {
          throw new Error("Failed to fetch favorite books data");
        }

        const data = await response.json();
        setFavoriteBooks(data); // Set favorite books to state
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };

    fetchFavoriteBooks();
  }, []); // Empty dependency array ensures this runs only once after component mounts

  useEffect(() => {
    const fetchBooks = async () => {
      if (favoriteBooks.length === 0) return;
      const bookIds = favoriteBooks.map((book) => book.bookId);
      console.log(bookIds);
      try {
        const responses = await Promise.all(
          bookIds.map(async (id) => {
            const res = await axios.get(
              `https://localhost:7195/api/Books/${id}`
            );
            return res.data;
          })
        );
        setBookDetails(responses);
      } catch (error) {
        console.error("Error fetching book details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setBookDetails([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [favoriteBooks]);
  console.log(bookDetails);

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-1">Favorite Books</h2>
      <p className="text-gray-500 mb-6">Books you've marked as favorites</p>

      {loading ? (
        <p>Loading...</p> // Show loading message while fetching
      ) : bookDetails.length === 0 ? (
        <p>No favorite books found</p> // Show if no book details are found
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookDetails.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <img
                  src={book.image || "/placeholder.svg"}
                  alt="Book Cover"
                  className="h-32 w-24 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500 mt-1">{book.genre}</p>

                <div className="mt-2">
                  {/* Add a StarRating component here if needed */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
