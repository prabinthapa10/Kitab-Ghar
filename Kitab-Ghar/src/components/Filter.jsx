import React, { useState, useEffect } from "react";

export function Filter({ onFilterChange }) {
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState(false);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const filters = {
      genres: genre ? [genre] : [],
      languages: language ? [language] : [],
      minPrice,
      maxPrice,
      availability,
      sort: sortOption,
    };
    onFilterChange(filters);
  }, [genre, language, minPrice, maxPrice, availability, sortOption]);

  const clearAll = () => {
    setGenre("");
    setLanguage("");
    setMinPrice("");
    setMaxPrice("");
    setAvailability(false);
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 bg-white rounded-lg shadow sticky top-24">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={clearAll}
        >
          Clear all
        </button>
      </div>

      {/* Genre */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Genre</h4>
        {[
          "Fiction",
          "Non-Fiction",
          "Mystery",
          "Sci-Fi",
          "Romance",
          "Biography",
        ].map((label) => (
          <label
            key={label}
            className="flex items-center text-sm gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="genre"
              checked={genre === label}
              onChange={() => setGenre(label)}
            />
            {label}
          </label>
        ))}
      </div>

      {/* Language */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Language</h4>
        {["English", "Nepali", "Spanish", "Hindi", "French"].map((label) => (
          <label
            key={label}
            className="flex items-center text-sm gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="language"
              checked={language === label}
              onChange={() => setLanguage(label)}
            />
            {label}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 border px-2 py-1 text-sm rounded"
            placeholder="Min"
          />
          <span className="text-sm">to</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 border px-2 py-1 text-sm rounded"
            placeholder="Max"
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Sort By</h4>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border px-2 py-1 text-sm rounded"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title_asc">Title: A-Z</option>
            <option value="title_desc">Title: Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
