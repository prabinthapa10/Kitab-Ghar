import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
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
    image: "", // will hold base64 string
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Convert uploaded image to base64 and store in book.image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook((prevBook) => ({
          ...prevBook,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit book with base64 image
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
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="rounded-lg border border-gray-200 bg-white p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Book ID
            </label>
            <input
              type="text"
              name="bookid"
              value={book.bookid}
              onChange={handleChange}
              placeholder="Enter book ID"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Enter author's name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              placeholder="e.g., Fantasy, Mystery"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <input
              type="text"
              name="language"
              value={book.language}
              onChange={handleChange}
              placeholder="e.g., English"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Publishers */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Publishers
            </label>
            <input
              type="text"
              name="publishers"
              value={book.publishers}
              onChange={handleChange}
              placeholder="Enter publisher name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Enter book description"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ISBN
            </label>
            <input
              type="text"
              name="ISBN"
              value={book.ISBN}
              onChange={handleChange}
              placeholder="Enter ISBN number"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* format */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Format
            </label>
            <input
              type="text"
              name="format"
              value={book.format}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={book.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
