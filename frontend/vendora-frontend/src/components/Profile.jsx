import React, { useState } from "react";
import MyBookings from "./ProfileSubComponents/MyBookings";
import MyListings from "./ProfileSubComponents/MyListings";
import PaymentInfo from "./ProfileSubComponents/PaymentInfo";
import Favorites from "./ProfileSubComponents/Favorites";
import Navbar from "./Navbar";

export default function Profile() {
  const [subSection, setSubSection] = useState("myListings");

  const handleSection = (section) => {
    setSubSection(section);
  };

  const sectionComponents = {
    myListings: <MyListings />,
    myBookings: <MyBookings />,
    paymentInfo: <PaymentInfo />,
    favorites: <Favorites />,
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col">
          {/* Improved header */}
          

          <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col py-4">
              <button
                onClick={() => handleSection("myListings")}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition rounded-md ${
                  subSection === "myListings"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    subSection === "myListings" ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
                  <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
                  <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                </svg>
                My Listings
              </button>

              <button
                onClick={() => handleSection("myBookings")}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition rounded-md ${
                  subSection === "myBookings"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    subSection === "myBookings"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                My Bookings
              </button>

              <button
                onClick={() => handleSection("paymentInfo")}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition rounded-md ${
                  subSection === "paymentInfo"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    subSection === "paymentInfo"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                Payment Info
              </button>

              <button
                onClick={() => handleSection("favorites")}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition rounded-md ${
                  subSection === "favorites"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    subSection === "favorites"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                Favorites
              </button>

              <div className="mt-6 px-5">
                <button className="w-full text-left py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition">
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            {sectionComponents[subSection]}
          </div>
        </div>
      </div>
    </>
  );
}
