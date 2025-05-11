import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import ActionMenu from "./ActionMenu";

export default function BookDetail() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7195/api/Books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.includes(searchTerm)
  );

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
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.slice(0, 5).map((book) => (
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
                    <td className="p-2 text-center">
                      <span className="cursor-pointer text-xl">
                        <ActionMenu
                          onView={() => console.log("Viewing", book.bookId)}
                          onEdit={() => console.log("Editing", book.bookId)}
                          onDelete={() => console.log("Deleting", book.bookId)}
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
              Showing 1 to 5 of {filteredBooks.length} books
            </span>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded text-sm bg-white text-gray-700"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 border rounded text-sm bg-black text-white">
                1
              </button>
              <button className="px-3 py-1 border rounded text-sm bg-white text-gray-700">
                2
              </button>
              <button className="px-3 py-1 border rounded text-sm bg-white text-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
