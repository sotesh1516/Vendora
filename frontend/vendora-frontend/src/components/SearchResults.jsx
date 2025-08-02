import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function SearchResults() {

  // const [searchQueryInfo, setSearchQueryInfo] = useState("");
  // const getQueryInfo = async (queryToBeTransferredFromNavbar) => {
  //   setSearchQueryInfo(queryToBeTransferredFromNavbar);
  // }; // this will be useful for searching from the SearchResults component


  const [searchResults, setSearchResults] = useState([]);

  const [keyword, setKeyword] = useState("");

  //initially when Search Result component mounts this comes in handy
  useEffect(() => {
    const searchFetchedListingsFromDashboard = JSON.parse(localStorage.getItem("search_fetched_listings"));
    setSearchResults(searchFetchedListingsFromDashboard.data);
    console.log(searchFetchedListingsFromDashboard.data);
    setKeyword(searchFetchedListingsFromDashboard.searchKeyword);
  }, [])

  // useEffect(() => {
  //         async function searchRetrieveListings() {
  //             try {
  //                 const retrievedListings = await searchListings(searchQueryInfo);

  //                 if (retrievedListings && retrievedListings.fetchedListings) {
  //                     setSearchResults(retrievedListings.fetchedListings);
  //                     console.log("success in search fetching");
  //                 }
  //                 else {
  //                     console.log("you know what to do search edition");
  //                 }

  //             } catch (error) {

  //             }
  //         }

  //         searchRetrieveListings();
  //     }, [searchQueryInfo]);

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-md font-bold text-gray-800">
            Search results for{" "}
            <span className="text-blue-600 font-extrabold italic">
              “{keyword}”
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {searchResults.length} results found
          </p>
        </div>
      </div>

      {/* Vertical results - stretched wider */}
      <div className="w-full px-7 py-6 space-y-4">
        {searchResults.map((listing, idx) => (
          <div
          key={idx}
          className="w-full flex gap-4 p-4 border border-gray-100 rounded-lg bg-white hover:shadow-sm transition-all"
        >
        
            {/* Thumbnail */}
            <img
              // src={listing.avatar}
              src="https://img.daisyui.com/images/profile/demo/5@94.webp"
              alt={listing.title}
              className="w-24 h-24 rounded-md object-cover flex-shrink-0"
            />

            {/* Info section */}
            <div className="flex flex-col justify-between w-full">
              <div>
              <h2 className="text-base font-semibold text-gray-800">
  {listing.serviceName}
</h2>
<p className="text-xs text-gray-500 mt-0.5">
  {listing.serviceProvider}
</p>

                <p className="text-sm text-gray-600 mt-2 leading-snug line-clamp-2">
                  {listing.description}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-6 text-sm text-gray-700">
                <span className="font-medium">${listing.ratePerHr}/hr</span>
                <span>⭐ {listing.rating} ({listing.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
