import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function SearchResults() {
  const navigate = useNavigate();
  
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  
  //initially when Search Result component mounts this comes in handy
  useEffect(() => {
    const searchFetchedListingsFromDashboard = JSON.parse(localStorage.getItem("search_fetched_listings"));
    setSearchResults(searchFetchedListingsFromDashboard.data);
    console.log(searchFetchedListingsFromDashboard.data);
    setKeyword(searchFetchedListingsFromDashboard.searchKeyword);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 sticky top-0 z-30">
        <div className="px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">
              Search results for{" "}
              <span className="text-blue-600 font-black italic">
                "{keyword}"
              </span>
            </h1>
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {searchResults.length} results
            </span>
            <span className="text-gray-400">•</span>
            <span>Found in 0.12 seconds</span>
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="w-full px-4 py-8 space-y-6">
        {searchResults.map((listing, idx) => (
          <div
            key={idx}
            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 cursor-pointer overflow-hidden relative"
            onClick={() => navigate(`/listing/${listing._id}`)}
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/20 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative z-10 flex gap-6">
              {/* Enhanced Thumbnail */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                    alt={listing.serviceName}
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full shadow-sm" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 mb-1">
                      {listing.serviceName}
                    </h2>
                    <p className="text-sm font-medium text-blue-600 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {listing.serviceProvider}
                    </p>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed line-clamp-2 text-sm">
                    {listing.description}
                  </p>
                </div>
                
                {/* Stats */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900">${listing.ratePerHr}</span>
                      <span className="text-sm text-gray-500">/hour</span>
                    </div>
                  </div>
                  
                  <div className="w-px h-8 bg-gray-200 group-hover:bg-blue-200 transition-colors duration-300" />
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(listing.rating) ? 'text-yellow-400' : 'text-gray-200'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="font-semibold text-gray-900">{listing.rating}</span>
                      <span className="text-gray-500">({listing.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="ml-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      View Details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}