import React from "react";
import Navbar from "../components/Navbar";
import AllBooks from "./AllBooks";
import Footer from "../components/Footer";

const Book = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AllBooks />
      </main>
      <Footer />
    </div>
  );
};

export default Book;
