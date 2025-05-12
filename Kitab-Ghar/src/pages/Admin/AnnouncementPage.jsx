import { useState, useEffect } from "react";
import { format } from "date-fns";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const AnnouncementPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "general",
    announcementTime: new Date(),
  });
  const [announcements, setAnnouncements] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const currentTime = formData.announcementTime;
      const newDate = new Date(dateValue);
      newDate.setHours(currentTime.getHours());
      newDate.setMinutes(currentTime.getMinutes());

      setFormData({
        ...formData,
        announcementTime: newDate,
      });
    }
  };

  const handleTimeChange = (e) => {
    const timeString = e.target.value;
    if (timeString) {
      const [hours, minutes] = timeString.split(":").map(Number);
      const newDate = new Date(formData.announcementTime);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      setFormData({
        ...formData,
        announcementTime: newDate,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnnouncement = {
      ...formData,
      announcementTime: new Date(), // Ensure proper timestamp
    };

    axios
      .post("https://localhost:7195/api/Announcement", newAnnouncement)
      .then((response) => {
        setAnnouncements([response.data, ...announcements]);

        // Reset the form
        setFormData({
          title: "",
          message: "",
          type: "general",
          announcementTime: new Date(),
        });

        alert("Announcement created successfully!");
        setActiveTab("list");
      })
      .catch((error) => {
        console.error("Error creating announcement:", error);
        alert("Failed to create announcement.");
      });
  };

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowViewModal(true);
  };

  const handleDeleteAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowDeleteModal(true);
  };

  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatTimeForInput = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "promotion":
        return "bg-purple-500 text-white";
      case "maintenance":
        return "bg-orange-500 text-white";
      case "event":
        return "bg-emerald-500 text-white";
      case "general":
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Fetch announcements
  useEffect(() => {
    axios
      .get("https://localhost:7195/api/Announcement")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, []);

  // Handle click outside modals
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        setShowViewModal(false);
        setShowDeleteModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleConfirmDelete = async () => {
    if (selectedAnnouncement) {
      try {
        await axios.delete(
          `https://localhost:7195/api/Announcement/${selectedAnnouncement.id}`
        );
        const updatedAnnouncements = announcements.filter(
          (announcement) => announcement.id !== selectedAnnouncement.id
        );
        setAnnouncements(updatedAnnouncements);
        setShowDeleteModal(false);
        alert("Announcement deleted successfully!");
      } catch (error) {
        console.error("Failed to delete announcement:", error);
        alert("Error deleting announcement. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">
                Announcements
              </h1>
              <div className="flex items-center gap-2">
                <button
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    activeTab === "create"
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 border"
                  }`}
                  onClick={() => setActiveTab("create")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Create Announcement
                </button>
                <button
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    activeTab === "list"
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 border"
                  }`}
                  onClick={() => setActiveTab("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Announcement List
                </button>
              </div>
            </div>

            {activeTab === "create" && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Create New Announcement
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Create announcements to inform users about promotions,
                    events, or important updates.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Announcement Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Enter announcement title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Announcement Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter announcement message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Announcement Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                      <option value="general">General</option>
                      <option value="promotion">Promotion</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="event">Event</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Announcement Time (DateTimeOffset)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="announcementDate"
                          className="block text-xs text-gray-500 mb-1"
                        >
                          Date
                        </label>
                        <input
                          id="announcementDate"
                          type="date"
                          value={formatDateForInput(formData.announcementTime)}
                          onChange={handleDateChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="announcementTime"
                          className="block text-xs text-gray-500 mb-1"
                        >
                          Time
                        </label>
                        <input
                          id="announcementTime"
                          type="time"
                          value={formatTimeForInput(formData.announcementTime)}
                          onChange={handleTimeChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This will be stored as a DateTimeOffset in UTC format.
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("list")}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block mr-2"
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Create Announcement
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "list" && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Announcement List</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage your existing announcements.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Announcement Time
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {announcements.map((announcement) => (
                        <tr key={announcement.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {announcement.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getTypeBadgeClass(
                                announcement.type
                              )}`}
                            >
                              {announcement.type.charAt(0).toUpperCase() +
                                announcement.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(announcement.announcementTime, "PPP")} at{" "}
                            {format(announcement.announcementTime, "h:mm a")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  handleViewAnnouncement(announcement)
                                }
                                className="text-black hover:text-blue-900 p-1"
                                title="View"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
                                  <path d="M15 3v6h6" />
                                  <path d="M10 16l4-4" />
                                  <path d="M6 12h2" />
                                  <path d="M12 18h6" />
                                </svg>
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteAnnouncement(announcement)
                                }
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Delete"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M3 6h18" />
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {announcements.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No announcements found.
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {showViewModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 modal-overlay">
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Announcement Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Title</h4>
                <p className="mt-1">{selectedAnnouncement.title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Type</h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full inline-block mt-1 ${getTypeBadgeClass(
                    selectedAnnouncement.type
                  )}`}
                >
                  {selectedAnnouncement.type.charAt(0).toUpperCase() +
                    selectedAnnouncement.type.slice(1)}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Announcement Time
                </h4>
                <p className="mt-1">
                  {format(selectedAnnouncement.announcementTime, "PPP")} at{" "}
                  {format(selectedAnnouncement.announcementTime, "h:mm a")}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedAnnouncement.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 modal-overlay">
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-red-600">
                Delete Announcement
              </h3>
            </div>
            <div className="p-6">
              <p className="mb-4">
                Are you sure you want to delete this announcement? This action
                cannot be undone.
              </p>
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="font-medium">{selectedAnnouncement.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {format(selectedAnnouncement.announcementTime, "PPP")}
                </p>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementPage;
