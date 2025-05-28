import React, { useState } from 'react'
import "../../index.css"

function MyListings() {
  const [listings, setListings] = useState([
    {
      id: 1,
      name: "Amina Yusuf",
      title: "Math Tutoring",
      rating: 4.8,
      reviewsCount: 32,
      price: 15,
      avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
      description:
        "Offering help with calculus, linear algebra, and statistics. Ideal for undergrads or test prep. Sessions start at $15/hr.",
      reviews: [
        "Very helpful and patient tutor.",
        "Helped me pass my stats midterm!",
        "Always on time and explains things clearly."
      ]
    }
  ]);

  const listing = listings[0]

  const [selectedListing, setSelectedListing] = useState();

  return (
    <>

<div className="bg-base-100 rounded-box shadow-md p-4 space-y-4">
  {/* Title + Add Button */}
  <div className="flex items-center justify-between">
    <h2 className="text-xl tracking-wide">My Listings</h2>
    <button className="btn btn-sm btn-square btn-ghost" title="Add Listing">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="15" x2="15" y1="12" y2="18" />
        <line x1="12" x2="18" y1="15" y2="15" />
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    </button>
  </div>

  {/* Listing card */}
  <div onClick={() => setSelectedListing(listing)} className="rounded-lg border p-4 flex flex-col gap-4">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition cursor-pointer px-4 py-3 rounded-lg gap-4">
    {/* Avatar */}
    <div className="flex-shrink-0">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
        alt="Service Provider"
      />
    </div>

    {/* Info */}
    <div className="flex-grow">
      <div className="font-semibold text-sm">Amina Yusuf</div>
      <div className="text-xs uppercase font-semibold opacity-60">Math Tutoring</div>
      <div className="text-sm mt-1">
        <span>⭐ 4.8</span>
        <span className="text-gray-400 ml-1">(32)</span>
      </div>
      <p className="text-xs text-gray-600 mt-1 max-w-md">
        Offering help with calculus, linear algebra, and statistics. Ideal for undergrads or test prep. Sessions start at $15/hr.
      </p>
    </div>

    {/* Action buttons */}
    <div className="flex gap-2">
      <button className="btn btn-square btn-ghost" title="Edit Listing">
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>

      <button className="btn btn-square btn-ghost" title="Remove Listing">
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>

      <button className="btn btn-square btn-ghost" title="Favorite">
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.5-1.5 3-3.25 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5C2 10.75 3.5 12.5 5 14l7 7z" />
        </svg>
      </button>
    </div>
  </div>
  </div>

  {selectedListing && (
  <div className="fixed inset-0 z-50 bg-transparent flex items-center justify-center">
    <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{selectedListing.title}</h2>
        <button onClick={() => setSelectedListing(null)} className="text-gray-400 hover:text-black">&times;</button>
      </div>

      {/* Tab or section content */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500">Reviews</h3>
        <ul className="mt-2 space-y-1">
          {selectedListing.reviews.map((review, i) => (
            <li key={i} className="text-sm text-gray-700">• {review}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
</div>

    </>
  )
}

export default MyListings
