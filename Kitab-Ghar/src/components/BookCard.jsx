import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ id, title, image, genre, price, discount }) => {
  const navigate = useNavigate();

  // Function to calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (discount && discount.onSale) {
      const discountAmount = (price * discount.discountPercent) / 100;
      return price - discountAmount;
    }
    return price;
  };

  // Calculate the discounted price
  const discountedPrice = calculateDiscountedPrice(price, discount);

  return (
    <div
      onClick={() => {
        // Only pass the discount if it exists
        if (discount && discount.onSale) {
          navigate(`/book/${id}`, { state: { discount } });
        } else {
          navigate(`/book/${id}`);
        }
      }}
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/300"}
          alt={title}
          className="w-full h-64 object-cover"
        />
        {discount && discount.onSale && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            - {discount.discountPercent}% Off
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title || "Unknown Title"}</h3>
        <p className="text-gray-500 text-sm">{genre || "Unknown Genre"}</p>
        <div className="mt-2">
          <span className="text-lg font-bold text-gray-900">
            Rs {discountedPrice.toLocaleString("id-ID")}
          </span>
          {discount && discount.onSale && (
            <span className="text-sm text-gray-400 line-through ml-2">
              Rs {price.toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
