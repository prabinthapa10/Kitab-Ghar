import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AllBooks from "./AllBooks";

const Book = () => {
  return (
    <>
      <Navbar />
      <AllBooks />
    </>
  );
};

export default Book;
