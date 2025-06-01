import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Dashboard() {

    const categories = ["Trending", "New", "Popular", "For You", "Top Rated"];

    const [activeCategory, setActiveCategory] = useState("Trending");

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
            </div>
        </>
    );
}
