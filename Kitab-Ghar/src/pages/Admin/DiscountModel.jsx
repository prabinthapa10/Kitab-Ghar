import React, { useState } from "react";

const DiscountModal = ({ bookId, onClose, onSetDiscount, isLoading, book }) => {
  const [discountData, setDiscountData] = useState({
    discountPercent: "",
    discountStart: "",
    discountEnd: "",
    onSale: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDiscountData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetDiscount(bookId, discountData);
    // The modal will be closed in the parent component after the API call completes
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-xl w-full mx-4 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b p-4 py-6">
          <h3 className="text-xl font-semibold">
            {book ? `Set Discount for "${book.title}"` : "Set Discount"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
            disabled={isLoading}
          >
            &times;
          </button>
        </div>

        {/* Main content  */}
        <form onSubmit={handleSubmit} className="p-6 pt-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="discountPercent"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Discount Percentage
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="discountPercent"
                  id="discountPercent"
                  min="0"
                  max="100"
                  value={discountData.discountPercent}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md border p-2"
                  placeholder="0-100"
                  required
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
              {book && (
                <p className="mt-1 text-sm text-gray-500">
                  Current price: Rs. {book.price.toFixed(2)}
                </p>
              )}
            </div>

            {/* Date Range - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label
                  htmlFor="discountStart"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="discountStart"
                  id="discountStart"
                  value={discountData.discountStart}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="discountEnd"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="discountEnd"
                  id="discountEnd"
                  value={discountData.discountEnd}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Display Discounted Price Preview */}
            {book && discountData.discountPercent && (
              <div className="p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-700 font-medium">
                  Preview: Discounted price will be Rs.{" "}
                  {(
                    book.price -
                    (book.price * parseFloat(discountData.discountPercent)) /
                      100
                  ).toFixed(2)}{" "}
                  (Save Rs.{" "}
                  {(
                    (book.price * parseFloat(discountData.discountPercent)) /
                    100
                  ).toFixed(2)}
                  )
                </p>
              </div>
            )}

            {/* On Sale Checkbox - Added mb-6 for bottom margin */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="onSale"
                id="onSale"
                checked={discountData.onSale}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label
                htmlFor="onSale"
                className="ml-2 block text-sm text-gray-700"
              >
                Mark as On Sale (Displays a "Sale" badge on the storefront)
              </label>
            </div>
          </div>

          {/* Bottom spacing - Added py-6 to the footer div */}
          <div className="border-t p-4 py-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Processing...
                </>
              ) : (
                "Set Discount"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscountModal;
