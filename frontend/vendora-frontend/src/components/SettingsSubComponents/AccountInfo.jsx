import React, { useState, useEffect } from "react";

export default function General() {
  // Example state for profile info
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
  });

  // Example: load existing profile info (replace with your logic)
  useEffect(() => {
    // fetch user info from localStorage or API
    const user = JSON.parse(localStorage.getItem("logged_in_user"));
    if (user) {
      setProfile({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, []);

  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // send updated info to backend
    console.log("Saving changes:", profile);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Title */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900">
          General <span className="text-blue-600">Settings</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update your basic account information.
        </p>
      </div>

      {/* Settings Form */}
      <form
        onSubmit={handleSave}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Your full name"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Your username"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="you@example.com"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              // Reset or cancel changes
              console.log("Cancelled");
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
