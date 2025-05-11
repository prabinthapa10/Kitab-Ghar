import { useState, useRef, useEffect } from "react";

function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-xl px-2 hover:text-gray-600"
      >
        &#x22EE; {/* Vertical Ellipsis (⋮) */}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1 text-sm">
            <button
              onClick={onView}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
            >
              👁️ View Details
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
            >
              ✏️ Edit Book
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-red-50"
            >
              🗑️ Delete Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
