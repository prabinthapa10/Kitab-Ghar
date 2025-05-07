import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDescriptionPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://localhost:7195/api/Books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (!book)
    return <p className="text-center py-10 text-red-500">Book not found.</p>;

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
  } = book;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="md:flex">
          <div className="md:w-1/2 flex justify-center items-center p-6">
            <img
              src={image || "https://via.placeholder.com/400"}
              alt={title}
              className="w-[350px] h-[500px] object-cover rounded-lg shadow"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
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
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Published:</span>{" "}
              {new Date(publicationDate).toLocaleDateString()}
            </p>

            <div className="text-2xl font-bold text-gray-900 mb-4">
              Rs {price}
            </div>

            <p className="text-gray-800 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDescriptionPage;
