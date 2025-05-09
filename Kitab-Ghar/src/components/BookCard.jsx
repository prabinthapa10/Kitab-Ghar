import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ id, title, image, genre, price, discount }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/book/${id}`)}
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer"
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
        <h3 className="text-lg font-semibold">{title|| "asdf"}</h3>
        <p className="text-gray-500 text-sm">{genre}</p>
        <div className="mt-2">
          <span className="text-lg font-bold text-gray-900">Rs {price}</span>
          <span className="text-sm text-gray-400 line-through ml-2">
            Rs {parseFloat(price || 0).toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;