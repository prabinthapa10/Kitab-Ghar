import React from "react";

const BookCard = ({ id, name, image, genre, price, discount }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4">
        <div
          key={id}
          className="p-0 bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <img
              src={image || "https://via.placeholder.com/300"}
              alt={name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              - {discount || 10}%
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-500 text-sm">{genre}</p>
            <div className="mt-2">
              <span className="text-lg font-bold text-gray-900">
                Rs {price || 0}
              </span>
              {/* before discount price */}
              <span className="text-sm text-gray-400 line-through ml-2">
                Rp {parseFloat(price).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
