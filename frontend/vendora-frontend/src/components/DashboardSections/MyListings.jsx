import React, { useState } from 'react'

function MyListings() {
  const [listings, setListings] = useState([]);

  return (
    <>

      <div>
        <ul className="list bg-base-100 rounded-box shadow-md">

          <li className="p-4 pb-2 text-l opacity-60 tracking-wide">My Listings</li>

          <li className="list-row">
            <div className="size-10 rounded-box flex items-center justify-center bg-gray-100 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-plus-icon lucide-copy-plus"><line x1="15" x2="15" y1="12" y2="18" /><line x1="12" x2="18" y1="15" y2="15" /><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
            </div>
          </li>

          <li className="list-row hover:bg-gray-50 transition cursor-pointer px-4 py-3 rounded-lg">
            {/* Service provider avatar */}
            <div>
              <img
                className="size-10 rounded-full object-cover"
                src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                alt="Service Provider"
              />
            </div>

            {/* Provider name + service title */}
            <div>
              <div className="font-semibold text-sm">Amina Yusuf</div>
              <div className="text-xs uppercase font-semibold opacity-60">Math Tutoring</div>
            </div>

            {/* Short description */}
            <p className="list-col-wrap text-xs max-w-md">
              Offering help with calculus, linear algebra, and statistics. Ideal for undergrads or test prep. Sessions start at $15/hr.
            </p>

            {/* Action buttons */}
            {/* Edit Listing */}
            <button className="btn btn-square btn-ghost" title="Edit Listing">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>

            {/* Remove Listing */}
            <button className="btn btn-square btn-ghost" title="Remove Listing">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>

            {/* Favorite (optional if you're showing listings to others) */}
            <button className="btn btn-square btn-ghost" title="Favorite">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.5-1.5 3-3.25 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5C2 10.75 3.5 12.5 5 14l7 7z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MyListings
