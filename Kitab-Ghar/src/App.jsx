import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddBook from "./pages/Admin/AddBook";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BookDescriptionPage from "./pages/BookDescriptionPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Book from "./pages/Book";
import UserDetails from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";

import { ToastContainer } from "react-toastify";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookDetail from "./pages/Admin/BookDetail";
import AnnouncementPage from "./pages/Admin/AnnouncementPage";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/book" element={<Book />} />
          <Route path="/book/:id" element={<BookDescriptionPage />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order/:orderId" element={<OrderPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/addBook" element={<AddBook />} />
          <Route path="/admin/bookDetails" element={<BookDetail />} />

          <Route element={<ProtectedRoutes roles={["Admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/addBook" element={<AddBook />} />
            <Route path="/admin/bookDetails" element={<BookDetail />} />
            <Route path="/admin/announcements" element={<AnnouncementPage />} />
          </Route>
          {/* <Route path="/book_card" element={<BookCard />} /> */}
          {/* <Route path="/book/" element={<BookList />} /> */}
          {/* <Route path="/book/:id" element={<BookDescriptionPage />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
