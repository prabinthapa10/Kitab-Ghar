import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import ActionMenu from "./ActionMenu";
import ViewBookModal from "./ViewBookModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DiscountModel from "./DiscountModel";
import { toast } from "react-toastify";

export default function BookDetail() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [discountPercent, setDiscountPercent] = useState("");

  // Add this function inside your component
  const hasDiscount = (bookId) => {
    return discounts.some((discount) => discount.bookId === bookId);
  };

  // Fetch books
  const fetchBooks = () => {
    setIsLoading(true);
    setError(null);

    axios
      .get("https://localhost:7195/api/Books")
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Handle view book
  const handleViewBook = (book) => {
    setSelectedBook(book);
    setShowViewModal(true);
  };

  console.log("current", currentBooks);

  // Handle edit book
  const handleEditBook = (bookId) => {
    console.log("Editing book with ID:", bookId);
    // Implement edit functionality or navigation
  };

  // Handle set discount
  const handleSetDiscount = (bookId, discountData) => {
    setIsLoading(true);

    // Calculate the discounted price
    const discountPercentage = parseFloat(discountData.discountPercent);
    const bookToUpdate = books.find((book) => book.bookId === bookId);

    if (bookToUpdate) {
      const discountedPrice =
        bookToUpdate.price - (bookToUpdate.price * discountPercentage) / 100;

      // Add the discounted price to the discountData
      const updatedDiscountData = { discountedPrice: discountedPrice };

      axios
        .patch(
          `https://localhost:7195/api/Books/${bookId}/discount`,
          updatedDiscountData
        )
        .then((response) => {
          console.log("Discount applied successfully:", response.data);
          fetchBooks(); // Reload the books data
          setShowDiscountModal(false);
          setSelectedBook(null); // Clear selected book
          setIsLoading(false);
          toast.success("Discount applied successfully!");
        })
        .catch((error) => {
          console.error("Error applying discount:", error);
          setError("Failed to apply discount. Please try again.");
          setIsLoading(false);
        });
    } else {
      console.error("Book not found!");
      setIsLoading(false);
    }
  };

  // Handle delete book
  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  // Confirm delete book
  const confirmDeleteBook = () => {
    if (!selectedBook) return;

    setIsLoading(true);

    axios
      .delete(`https://localhost:7195/api/Books/${selectedBook.bookId}`)
      .then(() => {
        // Remove the book from the state
        setBooks(books.filter((book) => book.bookId !== selectedBook.bookId));
        setShowDeleteModal(false);
        setSelectedBook(null);
        setIsLoading(false);

        // Show success message (you could use a toast notification here)
        alert("Book deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        setError("Failed to delete book. Please try again.");
        setIsLoading(false);
      });
  };

  // Pagination controls
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 border rounded text-sm ${
            currentPage === i ? "bg-black text-white" : "bg-white text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  console.log(books);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Books Details</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Book Inventory</h2>
            <p className="text-gray-600">
              Manage your book inventory, prices, and availability.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
              className="p-2 border rounded w-full max-w-sm"
            />
            <button className="bg-white border px-4 py-2 rounded hover:bg-gray-100">
              Search
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 text-sm">
                <th className="p-2">
                  <input type="checkbox" />
                </th>
                <th className="p-2">ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">Availability</th>
                <th className="p-2">ISBN</th>
                <th className="p-2">On Sale</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr key={book.bookId} className="border-t text-sm">
                    <td className="p-2 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2">{book.bookId}</td>
                    <td className="p-2">{book.title}</td>
                    <td className="p-2">Rs. {book.price.toFixed(2)}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          book.availability
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {book.availability ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-2">{book.isbn}</td>
                    <td className="p-2">
                      {book.discountedPrice === 0 ? (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          Regular
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          On sale
                        </span>
                      )}
                    </td>

                    <td className="p-2 text-center">
                      <span className="cursor-pointer text-xl">
                        <ActionMenu
                          onView={() => handleViewBook(book)}
                          onEdit={() => handleEditBook(book.bookId)}
                          onDelete={() => handleDeleteBook(book)}
                          onSetDiscount={() => {
                            setSelectedBook(book);
                            setShowDiscountModal(true); // Show the discount modal
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirstBook + 1} to{" "}
              {Math.min(indexOfLastBook, filteredBooks.length)} of{" "}
              {filteredBooks.length} books
            </span>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded text-sm bg-white text-gray-700"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {renderPaginationButtons()}
              <button
                className="px-3 py-1 border rounded text-sm bg-white text-gray-700"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Set discount Model */}
      {showDiscountModal && selectedBook && (
        <DiscountModel
          bookId={selectedBook.bookId}
          book={selectedBook}
          onClose={() => setShowDiscountModal(false)}
          onSetDiscount={handleSetDiscount}
          isLoading={isLoading}
          setDiscountPercent={setDiscountPercent}
        />
      )}

      {/* View Book Modal */}
      {showViewModal && selectedBook && (
        <ViewBookModal
          book={selectedBook}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBook && (
        <DeleteConfirmationModal
          book={selectedBook}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteBook}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
