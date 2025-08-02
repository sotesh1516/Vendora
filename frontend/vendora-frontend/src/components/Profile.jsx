import React, { useState } from "react";
import MyBookings from "./ProfileSubComponents/MyBookings";
import MyListings from "./ProfileSubComponents/MyListings";
import PaymentInfo from "./ProfileSubComponents/PaymentInfo";
import Favorites from "./ProfileSubComponents/Favorites";
import Navbar from "./Navbar";

export default function Profile() {
  const [subSection, setSubSection] = useState("myListings");
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <Navbar />
      </div>


      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div
  className={`sticky top-[72px] h-[calc(100vh-72px)] bg-white shadow-sm transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-1/5"}`}
>

          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-5 z-10 bg-white border border-gray-200 rounded-full shadow w-8 h-8 flex items-center justify-center"
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="pl-2 pt-4 space-y-1">
            {/* Menu Item */}
            <button
              onClick={() => handleSection("myListings")}
              className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "myListings"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              <div className="min-w-[24px] flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide w-5 h-5 ${subSection === "myListings"
                      ? "text-gray-900"
                      : "text-gray-500"
                    }`}
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
                  <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
                  <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                </svg>
              </div>
              {!isCollapsed && <span>My Listings</span>}
            </button>

            {/* My Bookings */}
            <button
              onClick={() => handleSection("myBookings")}
              className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "myBookings"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              <div className="min-w-[24px] flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide w-5 h-5 ${subSection === "myBookings"
                      ? "text-gray-900"
                      : "text-gray-500"
                    }`}
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              {!isCollapsed && <span>My Bookings</span>}
            </button>

            {/* Payment Info */}
            <button
              onClick={() => handleSection("paymentInfo")}
              className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "paymentInfo"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              <div className="min-w-[24px] flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide w-5 h-5 ${subSection === "paymentInfo"
                      ? "text-gray-900"
                      : "text-gray-500"
                    }`}
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              {!isCollapsed && <span>Payment Info</span>}
            </button>

            {/* Favorites */}
            <button
              onClick={() => handleSection("favorites")}
              className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "favorites"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              <div className="min-w-[24px] flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide w-5 h-5 ${subSection === "favorites"
                      ? "text-gray-900"
                      : "text-gray-500"
                    }`}
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              {!isCollapsed && <span>Favorites</span>}
            </button>
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
