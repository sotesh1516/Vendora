import React, { useState } from "react";
import MyBookings from "./DashboardSections/MyBookings";
import MyListings from "./DashboardSections/MyListings";
import PaymentInfo from "./DashboardSections/PaymentInfo";
import Favorites from "./DashboardSections/Favorites";
import Navbar from "./Navbar";

export default function Profile() {
    const [subSection, setSubSection] = useState("myListings");

    const handleSection = (section) => {
        setSubSection(section);
    }

    const sectionComponents = {
        "myListings": <MyListings />,
        "myBookings": <MyBookings />,
        "paymentInfo": <PaymentInfo />,
        "favorites": <Favorites />,
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="w-1/5 border-r border-gray-200 bg-white shadow-sm">
                    <div className="p-2 space-y-1">
                        <button onClick={() => handleSection("myListings")} className="w-full text-left p-3 hover:bg-gray-100 rounded">My Listings</button>
                        <button onClick={() => handleSection("myBookings")} className="w-full text-left p-3 hover:bg-gray-100 rounded">My Bookings</button>
                        <button onClick={() => handleSection("paymentInfo")} className="w-full text-left p-3 hover:bg-gray-100 rounded">Payment Info</button>
                        <button onClick={() => handleSection("favorites")} className="w-full text-left p-3 hover:bg-gray-100 rounded">Favorites/Saved</button>
                        <button className="w-full text-left p-3 hover:bg-red-50 text-red-600 rounded">Logout</button>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                    {sectionComponents[subSection]}
                </div>
            </div>

        </>
    )
}