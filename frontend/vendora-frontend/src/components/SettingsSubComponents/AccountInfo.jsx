import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserInfo } from "../../api/user";

export default function General() {
  // Example state for profile info
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { accessToken } = useAuth();

  // Example: load existing profile info (replace with your logic)
  useEffect(() => {
    // fetch user info from localStorage or API
    const fetchUser = async () => {
      const user = await fetchUserInfo({accessToken});
    if (user) {
      setProfile({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
    };
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900">
            Account <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Information</span>
          </h1>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Update your basic account information and keep your profile current.
          </p>
        </div>

        {/* Profile Avatar Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img
                src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-100 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-sm" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">{profile.name || "Your Name"}</h2>
              <p className="text-blue-600 font-semibold">@{profile.username || "username"}</p>
              <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">@</span>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white"
                  placeholder="your-username"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                console.log("Cancelled");
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-amber-800 mb-1">Security Notice</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Changes to your email address will require verification. You'll receive a confirmation email to complete the update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}