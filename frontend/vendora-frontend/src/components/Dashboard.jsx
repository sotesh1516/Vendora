import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Dashboard() {

    const [subSection, setSubSection] = useState("myListings");

    const handleSection = (section) => {
        setSubSection(section);
    }

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen">
                {/* Left (thinner) block */}
                <div className="w-1/5">
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left">
                        <span className="pl-2">My Listings</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left">
                        <span className="pl-2">My Bookings</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left">
                        <span className="pl-2">Payment Info</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left">
                        <span className="pl-2">Reviews & Rating</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left">
                        <span className="pl-2">Favorites/Saved</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left">
                        <span className="pl-2">Logout</span></button>
                </div>

                {/* Right (main) block */}
                <div className="flex-1 bg-blue-100 p-6">
                    <p>Main content area</p>
                </div>
            </div>
        </>
    )
}