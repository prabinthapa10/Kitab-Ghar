import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AllBooks = ({ filters = {} }) => {
  const [books, setBooks] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const title = query.get("search");
    const isbn = query.get("isbn");
    const genre = query.get("genre");

    const fetchBooks = async () => {
      try {
        let url = "";

        if (title || isbn || genre) {
          const params = new URLSearchParams();
          if (title) params.append("title", title);
          if (isbn) params.append("isbn", isbn);
          if (genre) params.append("genre", genre);
          url = `https://localhost:7195/api/Books/search?${params.toString()}`;
        } else if (
          filters.minPrice ||
          filters.maxPrice ||
          filters.availability ||
          (filters.genres && filters.genres.length === 1) ||
          (filters.languages && filters.languages.length === 1)
        ) {
          const params = new URLSearchParams();
          if (filters.minPrice) params.append("minPrice", filters.minPrice);
          if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
          if (filters.availability) params.append("availability", true);
          if (filters.genres && filters.genres.length === 1)
            params.append("genre", filters.genres[0]);
          if (filters.languages && filters.languages.length === 1)
            params.append("language", filters.languages[0]);

          url = `https://localhost:7195/api/Books/filter?${params.toString()}`;
        } else {
          url = `https://localhost:7195/api/Books`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setBooks(data);
        setCurrentPage(1); // reset to page 1 when books change
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, [location.search, filters]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const res = await axios.get("https://localhost:7195/api/Discount");
        setDiscounts(res.data);
      } catch (err) {
        console.error("Error fetching discounts:", err);
      }
    };

    fetchDiscounts();
  }, []);

  const getDiscountForBook = (bookId) => {
    const discount = discounts.find((d) => d.bookId === bookId && d.onSale);
    return discount ? discount : null;
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => {
            const discount = getDiscountForBook(book.bookId);
            return (
              <div
                key={book.bookId}
                onClick={() => navigate(`/book/${book.bookId}`)}
                className="p-0 bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer"
              >
                <BookCard
                  id={book.bookId}
                  image={book.image}
                  title={book.title}
                  genre={book.genre}
                  price={book.price}
                  discount={discount}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">No books found.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {books.length > booksPerPage && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
