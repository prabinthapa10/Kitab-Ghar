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

import { ToastContainer } from "react-toastify";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookDetail from "./pages/Admin/BookDetail";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes restricted>
                <Home />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes restricted>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes restricted>
                <Signup />
              </PublicRoutes>
            }
          />
          <Route
            path="/book"
            element={
              <PublicRoutes restricted>
                <Book />
              </PublicRoutes>
            }
          />
          <Route
            path="/book/:id"
            element={
              <PublicRoutes restricted>
                <BookDescriptionPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoutes restricted>
                <AboutPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicRoutes restricted>
                <ContactPage />
              </PublicRoutes>
            }
          />

          <Route element={<ProtectedRoutes roles={["Member"]} />}>
            <Route path="/user" element={<UserDetails />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          <Route element={<ProtectedRoutes roles={["Admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/addBook" element={<AddBook />} />
            <Route path="/admin/bookDetails" element={<BookDetail />} />
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
