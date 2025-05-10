import React, { useState } from "react";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Submit logic here (e.g., API call)
    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    alert("Password updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
      <p className="text-gray-500 mb-6">Manage your account preferences</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            className="block font-medium text-gray-700 mb-1"
            htmlFor="current-password"
          >
            Change Password
          </label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            className="block font-medium text-gray-700 mb-1"
            htmlFor="new-password"
          >
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            className="block font-medium text-gray-700 mb-1"
            htmlFor="confirm-password"
          >
            Confirm New Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-800 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
