import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Edit,
  Heart,
  History,
  Settings,
  User,
} from "lucide-react";
import ProfileForm from "../components/Profile/ProfileForm";
import Wishlish from "../components/Profile/Wishlish";
import HistoryComponent from "../components/Profile/History";
import Setting from "../components/Profile/Setting";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
              <h1 className="text-3xl font-bold">Jane Doe</h1>
              <p className="text-gray-500">Book enthusiast since 2020</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm">
                  <BookOpen className="h-4 w-4" />
                  42 Books Read
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm">
                  <Heart className="h-4 w-4" />
                  15 Favorites
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm">
                  <Calendar className="h-4 w-4" />
                  Member for 3 years
                </div>
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
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2 py-2 ${
                  activeTab === "profile"
                    ? "border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`flex items-center gap-2 py-2 ${
                  activeTab === "favorites"
                    ? "border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                <Heart className="h-4 w-4" />
                Favorites
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 py-2 ${
                  activeTab === "history"
                    ? "border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                <History className="h-4 w-4" />
                History
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 py-2 ${
                  activeTab === "settings"
                    ? "border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "favorites" && <Wishlish />}
          {activeTab === "history" && <HistoryComponent />}
          {activeTab === "settings" && <Setting />}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;
