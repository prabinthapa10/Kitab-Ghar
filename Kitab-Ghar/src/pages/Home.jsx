import React from "react";
import Navbar from "../components/Navbar";
import Book from "./Book";
import AllBooks from "./AllBooks";
import Footer from "../components/Footer";

function Home() {
  const aa = localStorage.getItem("token");

  console.log("adsf", aa);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AllBooks />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
