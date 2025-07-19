import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ListingCard from "./DashboardSubComponents/ListingCard";
import { retrieveListings, searchListings } from "../api/listing";


export default function Dashboard() {

    const categories = ["Trending", "New", "Popular", "For You", "Top Rated"];

    const [activeCategory, setActiveCategory] = useState("Trending");

    const [listings, setListings] = useState([]);

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
        </>
    );
}
