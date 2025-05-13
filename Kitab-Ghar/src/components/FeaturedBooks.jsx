import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

function FeaturedBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://localhost:7195/api/Books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Books</h2>
          <Link
            to="/book"
            className="text-amber-600 hover:underline text-sm md:text-base"
          >
            View All
          </Link>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.bookId}
              onClick={() => navigate(`/book/${book.bookId}`)}
              className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBooks;
