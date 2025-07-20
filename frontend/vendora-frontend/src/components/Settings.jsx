import React, { useState } from 'react'
import Navbar from './Navbar'


import General from './SettingsSubComponents/General';
import PaymentInfo from "./ProfileSubComponents/PaymentInfo";
import Favorites from "./ProfileSubComponents/Favorites";
import AccountInfo from './SettingsSubComponents/AccountInfo';

function Settings() {

    const [subSection, setSubSection] = useState("general");

    const handleSection = (section) => {
        setSubSection(section);
    }

    const sectionComponents = {
        "general": <General />,
        "accountInfo": <AccountInfo />,
        "paymentInfo": <PaymentInfo />,
        "favorites": <Favorites />,
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="menu w-1/5 bg-white relative shadow-sm">
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200" />
                    <div className="pl-2 space-y-1">
                        <button onClick={() => handleSection("general")} className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "general" ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className={`${subSection === "general" ? "text-gray-900" : "text-gray-500"} w-5 h-5`}>
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .7.39 1.34 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.7 0 1.34.39 1.51 1H21a2 2 0 0 1 0 4h-.09c-.7 0-1.34.39-1.51 1z" />
                            </svg>
                            General</button>
                        <button onClick={() => handleSection("accountInfo")} className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "accountInfo" ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className={`${subSection === "accountInfo" ? "text-gray-900" : "text-gray-500"} w-5 h-5`}>
                                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>Account Information</button>
                        <button onClick={() => handleSection("paymentInfo")} className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "paymentInfo" ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-credit-card-icon lucide-credit-card ${subSection === "paymentInfo" ? "text-gray-900" : "text-gray-500"}`}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>Payment Info</button>
                        <button onClick={() => handleSection("favorites")} className={`flex items-center gap-4 w-full text-left p-3 rounded cursor-pointer ${subSection === "favorites" ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-heart-icon lucide-heart ${subSection === "favorites" ? "text-gray-900" : "text-gray-500"}`}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>Favorites</button>

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

export default Settings
