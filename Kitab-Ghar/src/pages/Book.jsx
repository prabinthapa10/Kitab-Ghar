"use client";

import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://localhost:7195/api/Books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setIsLoading(false);
      });
  }, []);

  const handleBannerCtaClick = () => {
    // You can implement specific behavior when the banner CTA is clicked
    // For example, scroll to a specific section or navigate to a featured collection
    window.scrollTo({
      top: document.getElementById("products-section")?.offsetTop - 100 || 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section */}
        <Banner
          title="Discover Your Next Favorite Book"
          subtitle="Explore our curated collection of bestsellers, new releases, and timeless classics"
          ctaText="Explore Books"
          onCtaClick={handleBannerCtaClick}
        />

        {/* Products Section */}
        <div id="products-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Books</h2>
            <div className="flex gap-2">
              {/* Optional: Add filter or sort controls here */}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg h-[300px] animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {books.length > 0 ? (
                books.map((book) => (
                  <div
                    key={book.bookId}
                    onClick={() => navigate(`/book/${book.bookId}`)}
                    className="p-0 bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
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
                  <p className="text-lg text-muted-foreground">
                    No books found.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;
