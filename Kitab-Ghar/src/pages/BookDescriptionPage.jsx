import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDescriptionPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);


  useEffect(() => {
    fetch(`https://localhost:7195/api/Books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Failed to fetch book:", err));
  }, [id]);

  if (!book) {
    return <div className="text-center py-10">Loading...</div>;
  }

  console.log(book);
  const {
    title,
    author,
    genre,
    language,
    isbn,
    format,
    publishers,
    publicationDate,
    description,
    image,
    price,
    reviews = [],
    discounts = [],
  } = book;

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={image || "https://via.placeholder.com/400"}
              alt={title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Author:</span> {author}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Genre:</span> {genre}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Language:</span> {language}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">ISBN:</span> {isbn}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Format:</span> {format}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Publisher:</span> {publishers}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Published:</span>{" "}
              {new Date(publicationDate).toLocaleDateString()}
            </p>

            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {/* Rs {discountedPrice} Rs {discounts[0] || price} */}
              </span>
            </div>

            <p className="mt-6 text-gray-800">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDescriptionPage;
