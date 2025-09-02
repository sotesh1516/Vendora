import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchListings } from "../api/listing";
import { useAuth } from "./contexts/AuthContext";
import { signOut } from "../api/auth";

export default function Navbar() {

  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useAuth();

  const [showSignInModal, setShowSignInModal] = useState(false);// reroute user to sign in if there is an engagement with a
  // restircted user

  const withAuth = async (callback) => {
    if (!accessToken) {
      setShowSignInModal(true);
      return;
    }

    try {
      const authCheck = await whoAmI({ accessToken });
      if (!authCheck.authenticated) {
        setShowSignInModal(true);
        return;
      }
      // User is authenticated, execute the callback
      callback();
    } catch (error) {
      console.error('Auth check failed:', error);
      setShowSignInModal(true);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = async (event) => {
    //this handles input change that happens inside the search box
    setSearchQuery(event.target.value);
  };

  const handleSignIn = () => {
    setShowSignInModal(false);
    navigate('/signin'); // Adjust this path to your sign-in route
  };

  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    // Only search if there is a valid query
    if (!searchQuery || searchQuery.trim() === "") {
      return; // don't trigger search
    }

    async function searchRetrieveListings() {
      try {
        const retrievedListings = await searchListings(searchQuery);

        if (retrievedListings && retrievedListings.fetchedListings) {
          // setListings(retrievedListings.fetchedListings); this is useful if i decide to display the search results on the dashboard
          const searchInfo = {
            data: retrievedListings.fetchedListings,
            searchKeyword: searchQuery,
          };
          window.localStorage.setItem("search_fetched_listings", JSON.stringify(searchInfo));
          navigate("/results");
          console.log("success in search fetching");
        }
        else {
          console.log("you know what to do search edition");
        }

      } catch (error) {
        console.log(error);
      }
    }

    if (shouldSearch) {
      searchRetrieveListings();
    }
  }, [shouldSearch]);

  const handleSignOut = async () => {
    try {
      const result = await signOut({ accessToken });

      if (result.success) {
        setAccessToken(""); // clear in-memory token
        navigate("/dashboard"); // redirect to sign-in
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Unexpected sign out error:", error);
    }
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
                    setShouldSearch(true);
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
              onClick={() => setShouldSearch(true)}
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
              {accessToken ? (
                <>
                  {/* Signed-in view */}
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
                      className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 text-sm"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 text-sm"
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="mt-2 pt-2 border-t border-gray-100">
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200 w-full text-left text-sm text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Logged-out view */}
                  <li>
                    <Link
                      to="/signin"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 text-sm"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 text-sm"
                    >
                      Create account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}