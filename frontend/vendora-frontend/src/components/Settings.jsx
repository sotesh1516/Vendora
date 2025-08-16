import React, { useState } from 'react';
import Navbar from './Navbar';
import General from './SettingsSubComponents/General';
import PaymentInfo from "./ProfileSubComponents/PaymentInfo";
import Favorites from "./ProfileSubComponents/Favorites";
import AccountInfo from './SettingsSubComponents/AccountInfo';
import Security from './SettingsSubComponents/Security';

function Settings() {
  const [subSection, setSubSection] = useState("general");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSection = (section) => {
    setSubSection(section);
  };

  const sectionComponents = {
    general: <General />,
    accountInfo: <AccountInfo />,
    security: <Security />,
    paymentInfo: <PaymentInfo />,
    favorites: <Favorites />,
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <Navbar />
      </div>

      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Sidebar */}
        <div
          className={`sticky top-[72px] h-[calc(100vh-72px)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-1/5"}`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="
              absolute -right-4 top-5 z-10 bg-white/90 backdrop-blur border border-gray-200 rounded-full shadow-lg 
              w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-200
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-600"
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

          <div className="p-4 space-y-2">
            {/* Settings Header */}
            {!isCollapsed && (
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Settings</h2>
                <p className="text-sm text-gray-600">Customize your experience</p>
              </div>
            )}

            <button
              onClick={() => handleSection("general")}
              className={`
                flex items-center gap-4 w-full text-left p-3 rounded-xl cursor-pointer transition-all duration-200
                ${subSection === "general"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "hover:bg-white/60 hover:shadow-md text-gray-700"
                }
              `}
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
                  className="lucide w-5 h-5"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .7.39 1.34 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.7 0 1.34.39 1.51 1H21a2 2 0 0 1 0 4h-.09c-.7 0-1.34.39-1.51 1z" />
                </svg>
              </div>
              {!isCollapsed && <span className="font-medium">General</span>}
            </button>

            <button
              onClick={() => handleSection("accountInfo")}
              className={`
                flex items-center gap-4 w-full text-left p-3 rounded-xl cursor-pointer transition-all duration-200
                ${subSection === "accountInfo"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "hover:bg-white/60 hover:shadow-md text-gray-700"
                }
              `}
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
                  className="lucide w-5 h-5"
                >
                  <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              {!isCollapsed && <span className="font-medium">Account Info</span>}
            </button>

            <button
              onClick={() => handleSection("security")}
              className={`
                flex items-center gap-4 w-full text-left p-3 rounded-xl cursor-pointer transition-all duration-200
                ${subSection === "security"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "hover:bg-white/60 hover:shadow-md text-gray-700"
                }
              `}
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
                  className="lucide w-5 h-5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              {!isCollapsed && <span className="font-medium">Security</span>}
            </button>

            <button
              onClick={() => handleSection("paymentInfo")}
              className={`
                flex items-center gap-4 w-full text-left p-3 rounded-xl cursor-pointer transition-all duration-200
                ${subSection === "paymentInfo"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "hover:bg-white/60 hover:shadow-md text-gray-700"
                }
              `}
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
                  className="lucide w-5 h-5"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              {!isCollapsed && <span className="font-medium">Payment Info</span>}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {sectionComponents[subSection]}
        </div>
      </div>
    </>
  );
}

export default Settings;