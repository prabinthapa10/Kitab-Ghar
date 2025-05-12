import React from "react";

const ViewBookModal = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-semibold">Book Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          {/* Book Image */}
          {book.image && (
            <div className="mb-6 text-center">
              <img
                src={book.image}
                alt={book.title}
                className="max-h-60 mx-auto rounded shadow"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Basic Information</h4>
              <div className="space-y-3">
                <InfoItem label="Book ID" value={book.bookId} />
                <InfoItem label="Title" value={book.title} />
                <InfoItem label="ISBN" value={book.isbn || "N/A"} />
                <InfoItem
                  label="Price"
                  value={`Rs. ${book.price?.toFixed(2) || "0.00"}`}
                />
                <div>
                  <p className="text-sm text-gray-500">Availability</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      book.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.availability ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Additional Details</h4>
              <div className="space-y-3">
                <InfoItem label="Author" value={book.author || "N/A"} />
                <InfoItem label="Genre" value={book.genre || "N/A"} />
                <InfoItem label="Publisher" value={book.publishers || "N/A"} />
                <InfoItem label="Language" value={book.language || "N/A"} />
                <InfoItem label="Format" value={book.format || "N/A"} />
              </div>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="text-gray-700 whitespace-pre-wrap">
                {book.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {book.tags && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {book.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable field
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ViewBookModal;
