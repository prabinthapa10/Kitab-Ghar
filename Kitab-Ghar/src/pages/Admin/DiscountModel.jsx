import React, { useState } from "react";

export default function DiscountModel({
  bookId,
  book,
  onClose,
  onSetDiscount,
  isLoading,
}) {
  const [discountPercent, setDiscountPercent] = useState("");
  const handleSubmit = () => {
    if (!discountPercent) {
      alert("Please enter a discount percentage");
      return;
    }

    const discountData = { discountPercent: discountPercent };
    onSetDiscount(bookId, discountData); // Call the parent function with bookId and discountData
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          Set Discount for {book.title}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="discountPercent"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Percentage (%)
          </label>
          <input
            type="number"
            id="discountPercent"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter discount percentage"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-sm text-gray-700 bg-white hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border rounded text-sm text-white bg-blue-500 hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Applying..." : "Apply Discount"}
          </button>
        </div>
      </div>
    </div>
  );
}
