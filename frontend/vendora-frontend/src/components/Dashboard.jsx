import React from "react";
import Navbar from "./Navbar";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen">
                {/* Left (thinner) block */}
                <div className="w-1/5 bg-gray-200">
                    <button className="p-4">My Listings</button>
                    <button className="p-4">My Listings</button>
                    <button>My Listings</button>
                </div>

                {/* Right (main) block */}
                <div className="flex-1 bg-blue-100 p-6">
                    <p>Main content area</p>
                </div>
            </div>
        </>
    )
}