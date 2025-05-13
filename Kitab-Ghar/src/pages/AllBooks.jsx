import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { useNavigate, useLocation } from "react-router-dom";

const AllBooks = ({ filters = {} }) => {
  const [books, setBooks] = useState([]);
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
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, [location.search, filters]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4">
          {books.length > 0 ? (
            books.map((book) => (
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
                  discount={book.discount}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-muted-foreground">No books found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBooks;
