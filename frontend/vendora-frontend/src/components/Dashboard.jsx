import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ListingCard from "./DashboardSubComponents/ListingCard";
import { retrieveListings, searchListings } from "../api/listing";
import Footer from "./Footer";


export default function Dashboard() {

    const categories = ["Trending", "New", "Popular", "For You", "Top Rated"];

    const [activeCategory, setActiveCategory] = useState("Trending");

    const [listings, setListings] = useState([]);

    const [showFilterBar, setShowFilterBar] = useState(false);

    const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

    const [searchQueryInfo, setSearchQueryInfo] = useState("");

    const getQueryInfo = async (queryToBeTransferredFromNavbar) => {
        setSearchQueryInfo(queryToBeTransferredFromNavbar);
    };

    const navigate = useNavigate();

    useEffect(() => {
        async function getListings() {
            try {
                const response = await retrieveListings({ userId: localCopyOfSignedInUser.id });
                if (response && response.listings) {
                    setListings(response.listings);
                    console.log("success in fetching");
                }
                else {
                    console.log("you know what to do");
                }
            } catch (error) {
                console.log({ "error": error });
            }
        }

        getListings();
    }, [])

    useEffect(() => {
        // Only search if there is a valid query
        if (!searchQueryInfo || searchQueryInfo.trim() === "") {
            return; // don't trigger search
        }

        async function searchRetrieveListings() {
            try {
                const retrievedListings = await searchListings(searchQueryInfo);

                if (retrievedListings && retrievedListings.fetchedListings) {
                    // setListings(retrievedListings.fetchedListings); this is useful if i decide to display the search results on the dashboard
                    const searchInfo = {
                        data: retrievedListings.fetchedListings,
                        searchKeyword: searchQueryInfo,
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

        searchRetrieveListings();
    }, [searchQueryInfo]);

    return (
        <>
            <Navbar sendToParent={getQueryInfo} />

            {/* Category Tabs */}
            <div className="border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center gap-4 overflow-x-auto text-sm font-medium py-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`relative px-3 py-1 rounded-md transition-colors ${activeCategory === category
                                    ? "text-blue-600 bg-blue-50"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-4 px-4">
                <button
                    className="
      flex items-center gap-2
      px-4 py-2
      rounded-md
      bg-gray-100
      hover:bg-gray-200
      text-sm font-medium text-gray-700
      shadow-sm
      transition-all duration-150
      focus:outline-none focus:ring-2 focus:ring-blue-400
    "
                    onClick={() => setShowFilterBar(!showFilterBar)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 14.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 018 18v-3.586L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    Filter
                </button>
            </div>

            {showFilterBar && (
                <div className="border border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 mt-4 rounded-md">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-center gap-4 overflow-x-auto text-sm font-medium py-3">
                            <button className={`relative px-3 py-1 rounded-md transition-colors text-gray-600 hover:bg-gray-100`}>
                                💲 Low → High
                            </button>
                            <button className={`relative px-3 py-1 rounded-md transition-colors text-gray-600 hover:bg-gray-100`}>
                                💲 High → Low
                            </button>
                            <button className={`relative px-3 py-1 rounded-md transition-colors text-gray-600 hover:bg-gray-100`}>
                                ⭐ Top Rated
                            </button>
                            <button className={`relative px-3 py-1 rounded-md transition-colors text-gray-600 hover:bg-gray-100`}>
                                📍 Near Me
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* dashboard content goes here */}
            <div className="px-4 pt-8">
                <h2 className="text-xl font-bold">Showing: {activeCategory}</h2>
                {/* Tailored content based on activeCategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-sm 
      shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400
    "
                    onClick={() => {
                        // you’ll handle functionality here
                        console.log("Load more clicked!");
                    }}
                >
                    Load More
                </button>
            </div>
            <Footer />


        </>
    );
}
