import React, { useState } from "react";
import Navbar from "./Navbar";
import MyBookings from "./DashboardSections/MyBookings";
import MyListings from "./DashboardSections/MyListings";
import PaymentInfo from "./DashboardSections/PaymentInfo";
import Reviews from "./DashboardSections/Reviews";
import Favorites from "./DashboardSections/Favorites";


export default function Dashboard() {

    const [subSection, setSubSection] = useState("myListings");

    const handleSection = (section) => {
        setSubSection(section);
    }

    const sectionComponents = {
        "myListings": <MyListings/>,
        "myBookings": <MyBookings/>,
        "paymentInfo": <PaymentInfo/>,
        "reviews": <Reviews/>,
        "favorites": <Favorites/>,
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen">
                {/* Left (thinner) block */}
                <div className="w-1/5">
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left" onClick={() => handleSection("myListings")}>
                        <span className="pl-2">My Listings</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left" onClick={() => handleSection("myBookings")}>
                        <span className="pl-2">My Bookings</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left" onClick={() => handleSection("paymentInfo")}>
                        <span className="pl-2">Payment Info</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left" onClick={() => handleSection("reviews")}>
                        <span className="pl-2">Reviews & Rating</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left" onClick={() => handleSection("favorites")}>
                        <span className="pl-2">Favorites/Saved</span></button>
                    <button className="w-full hover:bg-gray-100 cursor-pointer transition p-4 text-left">
                        <span className="pl-2">Logout</span></button>
                </div>

                {/* Right (main) block */}
                <div className="flex-1  p-4">
                    {sectionComponents[subSection]}
                </div>
            </div>
        </>
    )
}