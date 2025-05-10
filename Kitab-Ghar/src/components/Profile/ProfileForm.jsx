// import React from "react";
// import { useAuth } from "../../Context/AuthContext";

// const ProfileForm = () => {
//   const { user, loading, error } = useAuth();

//   if (loading) {
//     return <p>Loading user details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!user) {
//     return <p>No user data available.</p>;
//   }
//   return (
//     <div className="p-4 border rounded-md shadow-sm">
//       <h2 className="text-xl font-bold mb-2">User Details</h2>
//       <p>
//         <strong>Name:</strong> {user.name}
//       </p>
//       <p>
//         <strong>Role:</strong> {user.role}
//       </p>
//       <p>
//         <strong>Email:</strong> {user.email}
//       </p>
//       <p>
//         <strong>ID:</strong> {user.id}
//       </p>
//     </div>
//   );
// };

// export default ProfileForm;

import React, { useState } from "react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    bio: "I love mystery novels and historical fiction. Currently exploring more sci-fi titles and always looking for book recommendations!",
    favoriteGenre: "Mystery",
    readingGoal: "50",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can submit this data to your backend here
    console.log("Submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">Personal Information</h2>
      <p className="text-gray-500 mb-6">Update your profile information</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Favorite Genre</label>
            <select
              name="favoriteGenre"
              value={formData.favoriteGenre}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            >
              <option>Mystery</option>
              <option>Historical Fiction</option>
              <option>Fantasy</option>
              <option>Science Fiction</option>
              <option>Romance</option>
              <option>Non-fiction</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Annual Reading Goal
            </label>
            <input
              type="number"
              name="readingGoal"
              value={formData.readingGoal}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
