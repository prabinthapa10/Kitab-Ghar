import React from "react";
import Navbar from "../components/Navbar";
import Book from "./Book";
import AllBooks from "./AllBooks";

function Home() {
  const aa = localStorage.getItem("token");

  console.log("adsf",aa);
  return (
    <div>
      <Navbar />
      <AllBooks />
    </div>
  );
}

export default Home;