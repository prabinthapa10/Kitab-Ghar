import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

const Book = () => {
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
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4">
          {books.length > 0 ? (
            books.map((book) => {
              return (
                <BookCard
                  id={book.bookId}
                  title={book.title}
                  genre={book.genre}
                  price={book.price}
                  discount={book.discount}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-muted-foreground">
                No books found.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;
