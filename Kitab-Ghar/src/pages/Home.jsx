import React from "react";
import Navbar from "../components/Navbar";
import Book from "./Book";
import BookCard from "../components/BookCard";
import Feature from "./Feature Product";

function Home() {
  return (
    <div>
      <Navbar />
      <h2>Feature</h2>
      <Feature />
    </div>
  );
}

export default Home;
