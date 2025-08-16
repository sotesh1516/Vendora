import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = async (event) => {
    //this handles input change that happens inside the search box
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    props.sendToParent(searchQuery);// this sends the query info to the dashboard component so it can be used for fetching the necessary listings
    console.log(searchQuery);
  };

  return (
    <div className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6 flex-1">
          <Link
            to="/dashboard"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Vendora
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                className="
                  w-80 px-4 py-2.5 pl-10 rounded-xl border border-gray-200 bg-white/80 
                  focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                  placeholder-gray-400 text-sm
                "
                onChange={handleChange}
                value={searchQuery}

                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={handleSearch}
              className="
                px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl
                hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm
              "
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                    className="w-9 h-9 rounded-full object-cover bg-white"
                  />
                </div>
                {/* Optional online indicator */}
                {/* <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div> */}
              </div>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="
                menu dropdown-content mt-3 w-56 p-2 shadow-xl rounded-xl bg-white/95 backdrop-blur 
                supports-[backdrop-filter]:bg-white/90 border border-gray-200 z-[1000]
              "
            >
              <li className="mb-1">
                <div className="flex items-center gap-3 px-3 py-3 border-b border-gray-100 mb-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                      <img
                        alt="User avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="w-10 h-10 rounded-full object-cover bg-white"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="
                    flex items-center gap-3 px-3 py-2 hover:bg-blue-50 hover:text-blue-700 
                    rounded-lg transition-colors duration-200 text-sm
                  "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="
                    flex items-center gap-3 px-3 py-2 hover:bg-blue-50 hover:text-blue-700 
                    rounded-lg transition-colors duration-200 text-sm
                  "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
              </li>
              <li className="mt-2 pt-2 border-t border-gray-100">
                <button
                  className="
                    flex items-center gap-3 px-3 py-2 hover:bg-red-50 hover:text-red-700 
                    rounded-lg transition-colors duration-200 w-full text-left text-sm text-red-600
                  "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}