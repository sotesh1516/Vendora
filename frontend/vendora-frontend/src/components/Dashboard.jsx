import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { retrieveListings } from "../api/listing";

export default function Dashboard() {

    const categories = ["Trending", "New", "Popular", "For You", "Top Rated"];

    const [activeCategory, setActiveCategory] = useState("Trending");

    const [listings, setListings] = useState([]);

    useEffect(() => {
        async function getListings() {
            try {
                const response = await retrieveListings();
                if (response && response.listings)
                {
                    setListings(response.listings);
                }
            } catch (error) {
                console.log({"error": error});
            }
        }
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
            <div className="p-4">
                <h2 className="text-xl font-bold">Showing: {activeCategory}</h2>
                {/* Tailored content based on activeCategory */}
                <div className="bg-white rounded-xl p-5 text-center shadow hover:shadow-md transition w-full max-w-xs">
  <img
    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
    className="mx-auto w-16 h-16 rounded-full mb-3 object-cover"
    alt="Service Avatar"
  />

  <h3 className="font-semibold text-md">Amina Yusuf</h3>
  <p className="text-xs text-gray-500">Math Tutoring</p>

  <div className="mt-2 text-sm text-gray-600">
    <span>$15/hr</span> · <span>⭐ 4.8 (32)</span>
  </div>

  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
    Covers calculus, stats, and linear algebra. Great for undergrads or test prep.
  </p>

  <div className="mt-4 flex justify-center gap-2">
    <button className="btn btn-xs btn-outline">View</button>
    <button className="btn btn-xs btn-ghost">❤️</button>
  </div>
</div>

            </div>
        </>
    );
}
