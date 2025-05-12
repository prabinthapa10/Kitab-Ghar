import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AllBooks from "./AllBooks";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import FeaturedBooks from "../components/FeaturedBooks";
import NewLetter from "../components/NewLetter";
import axios from "axios";

function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("https://localhost:7195/api/Announcement");
        setAnnouncements(res.data);
        if (res.data.length > 0) {
          setShowModal(true);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* banner */}
      <section className="bg-amber-50 py-12 px-10 md:py-24">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-lg text-gray-600">
              Explore our vast collection of bestsellers, classics, and hidden
              gems. Your reading adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-700 transition">
                Browse Collection
              </button>
              <button className="border border-orange-600 text-orange-600 px-6 py-2 rounded-md font-semibold hover:bg-orange-100 transition">
                Join Book Club
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <img
              src="/assets/banner/banner.png"
              alt="Books on shelves"
              className="w-full h-full object-cover rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      {/* products */}
      <section className="py-16 px-10 bg-white">
        <FeaturedBooks />
      </section>

      {/* categroy */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Fiction",
              "Non-Fiction",
              "Mystery",
              "Sci-Fi",
              "Romance",
              "Biography",
            ].map((category) => (
              <Link
                href="#"
                key={category}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow hover:text-amber-600"
              >
                <h3 className="font-medium">{category}</h3>
                <p className="text-sm text-muted-foreground mt-1">Explore</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* newsletter */}
      <NewLetter />

      {/* Announcements */}
      {showModal && announcements.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-transparent z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close announcement"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-amber-600 mb-2">
              {announcements[announcements.length - 1].title || "Announcment"}
            </h2>
            <p className="text-gray-700">
              {announcements[announcements.length - 1].message}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
