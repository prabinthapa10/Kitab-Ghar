import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddBook from "./pages/Admin/AddBook";
import BookCard from "./components/BookCard";
import Book from "./pages/Book";
import BookDescriptionPage from "./pages/BookDescriptionPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addBook" element={<AddBook />} />
          <Route path="/book" element={<Book />} />
          <Route path="/book/:id" element={<BookDescriptionPage />} />

          {/* <Route path="/book_card" element={<BookCard />} /> */}
          {/* <Route path="/book/" element={<BookList />} /> */}
          {/* <Route path="/book/:id" element={<BookDescriptionPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
