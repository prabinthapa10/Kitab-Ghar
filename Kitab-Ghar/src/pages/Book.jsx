import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AllBooks from "./AllBooks";
import Footer from "../components/Footer";
import { Filter } from "../components/Filter";

const Book = () => {
  const [filterOptions, setFilterOptions] = useState({});

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow py-6 max-w-7xl mx-auto w-full">
        {/* Left Sidebar Filter */}
        <div className="w-64 sticky top-0 hidden md:block">
          <Filter onFilterChange={setFilterOptions} />
        </div>

        {/* Right Side Book List */}
        <main className="flex-grow">
          <AllBooks filters={filterOptions} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Book;
