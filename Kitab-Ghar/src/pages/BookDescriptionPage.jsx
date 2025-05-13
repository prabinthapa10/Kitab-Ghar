import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Bookmark, BookmarkCheck } from "lucide-react";

const BookDescriptionPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();

  const { id: userId } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch(`https://localhost:7195/api/Books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      });

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(bookmarks.includes(id));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!user?.userId) throw new Error("User not logged in");

      let cart;
      const allCartsRes = await fetch("https://localhost:7195/api/Cart");
      const allCarts = await allCartsRes.json();
      cart = allCarts.find((c) => c.userId === user.userId);

      if (!cart) {
        const createRes = await fetch("https://localhost:7195/api/Cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId,
            date: new Date().toISOString(),
          }),
        });

        if (!createRes.ok) {
          const errorText = await createRes.text();
          throw new Error("Failed to create cart: " + errorText);
        }

        cart = await createRes.json();
      }

      const cartItemsRes = await fetch("https://localhost:7195/api/CartItem");
      const cartItems = await cartItemsRes.json();
      const existingItem = cartItems.find(
        (item) => item.bookId === book.bookId && item.cartId === cart.id
      );

      let response;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          cartId: existingItem.cartId,
          bookId: existingItem.bookId,
        };

        response = await fetch(
          `https://localhost:7195/api/CartItem/${existingItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
          }
        );
      } else {
        const newItem = {
          bookId: book.bookId,
          quantity: 1,
          cartId: cart.id,
        };

        response = await fetch("https://localhost:7195/api/CartItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
      }

      if (!response.ok) throw new Error("Failed to update/add item");

      toast.success("Item added to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error saving cart item:", err);
      setMessage("Failed to add book to cart.");
    }
  };

  const handleBookmark = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark a book.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7195/api/Bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          bookId: id,
        }),
      });

      if (response.ok) {
        setBookmarked(true); // Optionally set to false if toggling is supported in backend
        toast.success("Book bookmarked successfully!");
      } else {
        const errorText = await response.text();
        toast.error("Failed to bookmark book: " + errorText);
      }
    } catch (error) {
      console.error("Bookmark error:", error);
      toast.error("An error occurred while bookmarking.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <p className="text-gray-500 mb-6">
          The book you're looking for couldn't be found.
        </p>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          onClick={() => window.history.back()}
        >
          Back to Books
        </button>
      </div>
    );
  }

  const {
    title,
    author,
    genre,
    language,
    isbn,
    format,
    publishers,
    publicationDate,
    description,
    image,
    price,
    discountedPrice,
  } = book;

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Book Image */}
              <div className="bg-gray-100 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] duration-300">
                  <img
                    src={image || "/placeholder.svg?height=600&width=400"}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  {discountedPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      On Sale
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="p-8 md:p-10 lg:p-12">
                <div className="mb-8">
                  <div className="flex items-start justify-between mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {title}
                    </h1>
                    <button onClick={handleBookmark}>
                      {bookmarked ? (
                        <BookmarkCheck className="w-7 h-7 text-yellow-500 hover:text-yellow-600" />
                      ) : (
                        <Bookmark className="w-7 h-7 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>

                  <p className="text-xl text-black mb-6">by {author}</p>

                  <div className="mb-8">
                    {discountedPrice ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">
                          Rs {discountedPrice}
                        </span>
                        <span className="text-xl text-gray-400 line-through ml-3">
                          Rs {price}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        Rs {price}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 mb-8">
                    <button
                      className="px-8 py-3 bg-amber-50 hover:bg-amber-100 text-black rounded-lg transition-colors shadow-md font-medium"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>

                    <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                    Book Details
                  </h2>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                      <p className="text-gray-500 text-sm">Genre</p>
                      <p className="font-medium">{genre}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Language</p>
                      <p className="font-medium">{language}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Format</p>
                      <p className="font-medium">{format}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Publisher</p>
                      <p className="font-medium">{publishers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">ISBN</p>
                      <p className="font-medium">{isbn}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Published</p>
                      <p className="font-medium">
                        {publicationDate
                          ? new Date(publicationDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDescriptionPage;
