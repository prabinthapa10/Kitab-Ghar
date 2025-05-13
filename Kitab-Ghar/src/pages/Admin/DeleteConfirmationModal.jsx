import React from "react";

const DeleteConfirmationModal = ({ book, onCancel, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-semibold text-red-600">Delete Book</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            disabled={isLoading}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <p className="mb-4">
            Are you sure you want to delete the following book? This action
            cannot be undone.
          </p>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm text-gray-600">ISBN: {book.isbn || "N/A"}</p>
            <p className="text-sm text-gray-600">ID: {book.bookId}</p>
          </div>
        </div>

        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              "Delete Book"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
