import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const BookDescriptionPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://localhost:7195/api/Books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <p className="text-gray-500 mb-6">
          The book you're looking for couldn't be found.
        </p>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          onClick={() => window.history.back()}
        >
          Back to Books
        </button>
      </div>
    );
  }

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
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Book Image */}
              <div className="bg-gray-100 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] duration-300">
                  <img
                    src={image || "/placeholder.svg?height=600&width=400"}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="p-8 md:p-10 lg:p-12">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">
                    {title}
                  </h1>
                  <p className="text-xl text-black mb-6">by {author}</p>

                  <div className="mb-8">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{price}
                    </span>
                  </div>

                  <div className="flex gap-4 mb-8">
                    <button className="px-8 py-3 bg-amber-50 hover:bg-amber-100 text-black rounded-lg  transition-colors shadow-md font-medium">
                      Add to Cart
                    </button>
                    <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                    Book Details
                  </h2>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                      <p className="text-gray-500 text-sm">Genre</p>
                      <p className="font-medium">{genre}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Language</p>
                      <p className="font-medium">{language}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Format</p>
                      <p className="font-medium">{format}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Publisher</p>
                      <p className="font-medium">{publishers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">ISBN</p>
                      <p className="font-medium">{isbn}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Published</p>
                      <p className="font-medium">
                        {publicationDate
                          ? new Date(publicationDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDescriptionPage;
