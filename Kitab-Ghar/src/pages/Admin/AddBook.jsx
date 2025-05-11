import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    bookid: "",
    title: "",
    author: "",
    genre: "",
    price: "",
    language: "",
    publishers: "",
    description: "",
    availability: true,
    ISBN: "",
    format: "",
    tags: "",
    reviews: [],
    bookmarks: [],
    discounts: [],
    image: "", // base64 string
  });

  const [activeTab, setActiveTab] = useState("basic");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleAvailabilityToggle = () => {
    setBook((prev) => ({ ...prev, availability: !prev.availability }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBook((prevBook) => ({
        ...prevBook,
        image: reader.result, // base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7195/api/Books",
        book,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Book added successfully:", response.data);
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error.response?.data || error.message);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New Book</h1>
          <div className="space-x-2">
            <button
              onClick={() => window.history.back()}
              className="border px-4 py-2 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Book
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tabs */}
          <div className="space-x-2">
            {["basic", "details", "additional"].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                {tab === "basic"
                  ? "Basic Information"
                  : tab === "details"
                  ? "Book Details"
                  : "Additional Information"}
              </button>
            ))}
          </div>

          {/* Basic Information */}
          {activeTab === "basic" && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="bookid"
                  value={book.bookid}
                  onChange={handleChange}
                  placeholder="Book ID"
                  className="border p-2 rounded"
                />
                <input
                  name="ISBN"
                  value={book.ISBN}
                  onChange={handleChange}
                  placeholder="ISBN"
                  className="border p-2 rounded"
                />
                <input
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="border p-2 rounded col-span-2"
                  required
                />
                <input
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  placeholder="Author"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="publishers"
                  value={book.publishers}
                  onChange={handleChange}
                  placeholder="Publisher"
                  className="border p-2 rounded"
                />
              </div>
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded w-full min-h-[8rem]"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("details")}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Book Details */}
          {activeTab === "details" && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="genre"
                  value={book.genre}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Genre</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="science-fiction">Science Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="mystery">Mystery</option>
                </select>
                <select
                  name="format"
                  value={book.format}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Format</option>
                  <option value="hardcover">Hardcover</option>
                  <option value="paperback">Paperback</option>
                  <option value="ebook">E-Book</option>
                </select>
                <select
                  name="language"
                  value={book.language}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                </select>
                <input
                  type="number"
                  name="price"
                  value={book.price}
                  onChange={handleChange}
                  placeholder="Price ($)"
                  className="border p-2 rounded"
                  required
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={book.availability}
                  onChange={handleAvailabilityToggle}
                />
                <span>Available in stock</span>
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab("basic")}
                  className="border px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("additional")}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Additional Information */}
          {activeTab === "additional" && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <div className="flex gap-2 mt-2">
                <input
                  name="tags"
                  value={book.tags}
                  onChange={handleChange}
                  placeholder="Add tag"
                  className="border p-2 rounded flex-1"
                />
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <p className="mb-2">Upload Cover Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
                {book.image && (
                  <img
                    src={book.image}
                    alt="Preview"
                    className="mt-4 mx-auto h-40 object-contain"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab("details")}
                  className="border px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Save Book
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBook;
