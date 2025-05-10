import React from "react";
import { Heart } from "lucide-react";

const favoriteBooks = [
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Psychological Thriller",
    rating: 5,
    dateAdded: "2/15/2023",
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Literary Fiction",
    rating: 5,
    dateAdded: "11/3/2022",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    rating: 4,
    dateAdded: "8/22/2022",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex text-yellow-500 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

const Wishlish = () => {
  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-1">Favorite Books</h2>
      <p className="text-gray-500 mb-6">Books you've marked as favorites</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteBooks.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            {/* Placeholder Image */}
            <div className="bg-gray-100 h-48 flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Book Cover"
                className="h-16 w-16 opacity-50"
              />
              <div className="absolute top-2 right-2 bg-white p-1 rounded-md shadow">
                <Heart className="text-red-500 w-4 h-4" fill="currentColor" />
              </div>
            </div>

            {/* Book Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500 mt-1">{book.genre}</p>

              <div className="mt-2">
                <StarRating rating={book.rating} />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Added on {book.dateAdded}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlish;
