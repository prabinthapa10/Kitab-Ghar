import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import BookCard from "./BookCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FeaturedBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7195/api/Books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Custom arrow components
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4 ,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Books
          </h2>
          <Link
            to="/book"
            className="text-amber-600 hover:underline text-sm md:text-base font-medium"
          >
            View All
          </Link>
        </div>

        {/* Slick Slider */}
        <div className="relative">
          <Slider {...settings}>
            {books.map((book) => (
              <div key={book.bookId} className="px-2">
                <div
                  onClick={() => navigate(`/book/${book.bookId}`)}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBooks;
