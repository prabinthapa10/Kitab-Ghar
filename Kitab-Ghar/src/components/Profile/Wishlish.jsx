import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Wishlist = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useAuth();

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const response = await fetch(
          `https://localhost:7195/api/Bookmark/user/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch favorite books data");
        }
        const data = await response.json();
        setFavoriteBooks(data);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };

    fetchFavoriteBooks();
  }, [id]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (favoriteBooks.length === 0) {
        setBookDetails([]);
        setLoading(false);
        return;
      }

      const bookIds = favoriteBooks.map((book) => book.bookId);
      try {
        const responses = await Promise.all(
          bookIds.map(async (bookId) => {
            const res = await axios.get(
              `https://localhost:7195/api/Books/${bookId}`
            );
            return res.data;
          })
        );
        setBookDetails(responses);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setBookDetails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [favoriteBooks]);

  const handleDelete = async (bookId) => {
    const bookmarkToDelete = favoriteBooks.find(
      (bookmark) => bookmark.bookId === bookId
    );

    if (!bookmarkToDelete) {
      console.warn("Bookmark not found for bookId:", bookId);
      return;
    }

    try {
      await axios.delete(
        `https://localhost:7195/api/Bookmark/${bookmarkToDelete.id}`
      );
      setFavoriteBooks((prev) =>
        prev.filter((bookmark) => bookmark.bookId !== bookId)
      );
    } catch (error) {
      console.error("Error deleting bookmark:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-1">Favorite Books</h2>
      <p className="text-gray-500 mb-6">Books you've marked as favorites</p>

      {loading ? (
        <p>Loading...</p>
      ) : bookDetails.length === 0 ? (
        <p>No favorite books found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookDetails.map((book, index) => (
            <div
              key={book.bookId || index}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              {/* Cross delete button */}
              <button
                onClick={() => {
                  console.log("Delete button clicked for book:", book);
                  handleDelete(book.bookId);
                }}
                className="absolute top-2 right-2 text-red-500 text-xl font-bold hover:text-red-700"
              >
                &times;
              </button>

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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
