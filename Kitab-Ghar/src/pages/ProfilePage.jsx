import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BookOpen,
  Calendar,
  Edit,
  Heart,
  History as HistoryIcon,
  Settings,
  User,
} from "lucide-react";

import ProfileForm from "../components/Profile/ProfileForm";
import Wishlist from "../components/Profile/Wishlish";
import History from "../components/Profile/History";
import Setting from "../components/Profile/Setting";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../Context/AuthContext";

const ProfilePage = () => {
  const { id } = useAuth();
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://localhost:7195/api/Users/${id}`);
        setUsername(res.data?.name || "User");
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const TABS = [
    { label: "Profile", value: "profile", icon: <User className="h-4 w-4" /> },
    {
      label: "Favorites",
      value: "favorites",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      label: "History",
      value: "history",
      icon: <HistoryIcon className="h-4 w-4" />,
    },
    {
      label: "Settings",
      value: "settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-4">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{username}</h1>
              <p className="text-gray-500">Book enthusiast since 2020</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm">
                  <BookOpen className="h-4 w-4" />
                  42 Books Read
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm">
                  <Heart className="h-4 w-4" />
                  15 Favorites
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm">
                  <Calendar className="h-4 w-4" />
                  Member for 3 years
                </span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b">
          <div className="flex justify-center">
            <div className="flex gap-6 text-sm font-medium">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-2 py-2 transition-all duration-200 ${
                    activeTab === tab.value
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "favorites" && <Wishlist />}
          {activeTab === "history" && <History />}
          {activeTab === "settings" && <Setting />}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
