import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ListingCard from "./DashboardSubComponents/ListingCard";
import { retrieveListings } from "../api/listing";


export default function Dashboard() {

    const categories = ["Trending", "New", "Popular", "For You", "Top Rated"];

    const [activeCategory, setActiveCategory] = useState("Trending");

    const [listings, setListings] = useState([]);

    const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

    useEffect(() => {
        async function getListings() {
            try {
                const response = await retrieveListings({userId: localCopyOfSignedInUser.id});
                if (response && response.listings)
                {
                    setListings(response.listings);
                    console.log("success in fetching");
                }
                else
                {
                    console.log("you know what to do");
                }
            } catch (error) {
                console.log({"error": error});
            }
        }

        getListings();
    }, [])

    return (
        <>
            <Navbar />

            {/* Category Navigation Bar */}
            <div className="bg-base-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center gap-6 overflow-x-auto text-sm font-medium">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`pb-1 ${activeCategory === category
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-gray-600 hover:text-black"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* dashboard content goes here */}
            <div className="px-4 pt-8">
                <h2 className="text-xl font-bold">Showing: {activeCategory}</h2>
                {/* Tailored content based on activeCategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing}/>
                ))}
                </div>
            </div>
        </>
    );
}
