import React, { useState } from 'react'
import "../../index.css"
import { registerListing } from "../../api/listing"

function MyListings() {
  //this should be replaced by database query or an array of listings
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

  //this is temp, used for selecting one listing out of the listings array usestate
  const listing = listings[0]

  //state for setting the listing to be displayed using a modal
  const [selectedListing, setSelectedListing] = useState();

  const [addListing, setAddListing] = useState();

  //state for activating a modal for navigating listing 
  const [activeTab, setActiveTab] = useState("reviews");

  //state for activating a modal for editing listing
  const [editListing, setEditListing] = useState(false);

  //state for activating a modal for deleting listing
  const [deleteListing, setDeleteListing] = useState(false);

  //state for activating a modal that shows listing success
  const [showListingSuccess, setShowListingSuccess] = useState(false);


  return (
    <>

      <div className="bg-base-100 rounded-box shadow-md p-4 space-y-4">
        {/* Title + Add Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-wide">My Listings</h2>
          <button className="btn btn-sm btn-square btn-ghost" title="Add Listing" onClick={() => {
            setAddListing(true);
          }}>
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
              <button className="btn btn-square btn-ghost" title="Edit Listing" onClick={(e) => {
                e.stopPropagation();
                setEditListing(true);
              }}>
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </button>

              <button className="btn btn-square btn-ghost" title="Remove Listing" onClick={(e) => {
                e.stopPropagation();
                setDeleteListing(true);
              }}>
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

        {/* this is where the modal for a listing activates */}
        {selectedListing && (
          <div className="fixed inset-0 z-50 bg-transparent flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-6xl min-h-[70vh] p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedListing.title}</h2>
                <button onClick={() => setSelectedListing(null)} className="text-gray-400 hover:text-black text-xl">&times;</button>
              </div>

              {/* Tabs */}
              <div className="border-b mb-4">
                <nav className="flex space-x-6 text-sm font-medium text-gray-600">
                  <button className={activeTab === "reviews" ? "text-black border-b-2 border-black pb-2" : "pb-2"} onClick={() => setActiveTab("reviews")}>Reviews</button>
                  <button className={activeTab === "details" ? "text-black border-b-2 border-black pb-2" : "pb-2"} onClick={() => setActiveTab("details")}>Details</button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">User Reviews</h3>
                  <ul className="space-y-1">
                    {selectedListing.reviews.map((review, i) => (
                      <li key={i} className="text-sm text-gray-700">• {review}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">{selectedListing.description}</p>
                  <div className="text-sm text-gray-700">
                    <div><span className="font-semibold">Tutor:</span> {selectedListing.name}</div>
                    <div><span className="font-semibold">Rating:</span> ⭐ {selectedListing.rating} ({selectedListing.reviewsCount} reviews)</div>
                    <div><span className="font-semibold">Rate:</span> ${selectedListing.price}/hr</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {editListing && (
          <div className="fixed inset-0 z-50 bg-transparent bg-opacity-30 flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-xl p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Listing</h2>
                <button onClick={() => setEditListing(false)} className="text-gray-400 hover:text-black text-xl">&times;</button>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handle saving here
                  setEditListing(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" defaultValue={listing.name} className="input input-bordered w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" defaultValue={listing.title} className="input input-bordered w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($/hr)</label>
                  <input type="number" defaultValue={listing.price} className="input input-bordered w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea defaultValue={listing.description} className="textarea textarea-bordered w-full" />
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditListing(false)} className="btn btn-ghost">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteListing && (
          <div className="fixed inset-0 z-50 bg-transparent bg-opacity-30 flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this listing?</h2>
              <div className="flex justify-end gap-3">
                <button
                  className="btn btn-ghost"
                  onClick={() => setDeleteListing(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    // Perform delete logic here
                    console.log("Listing deleted");

                    // Optionally remove the listing from state
                    setListings((prev) =>
                      prev.filter((l) => l.id !== listing.id)
                    );

                    setDeleteListing(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {addListing && (
          <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-[90%] max-w-2xl p-6 rounded-xl shadow-xl">

              {/* Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Create New Service Listing</h2>
                <button onClick={() => setAddListing(false)} className="text-gray-400 hover:text-gray-800 text-2xl">
                  &times;
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const newListing = {
                    name: e.target.name.value,
                    service: e.target.service.value,
                    price: parseFloat(e.target.price.value),
                    description: e.target.description.value,
                    rating: [],
                    avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
                  };

                  try {
                    const response = await registerListing(newListing);
                    if (response && response.listing) {
                      setShowListingSuccess(true);
                      console.log("listing added to database");
                    }
                  } catch (error) {
                    console.log({ "error": error });
                  }

                  setListings((prev) => [...prev, newListing]);
                }}
                className="space-y-5"
              >

                {/* Section: Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text font-medium">Your Name</label>
                    <input name="name" type="text" required className="input input-bordered w-full" />
                  </div>

                  <div>
                    <label className="label-text font-medium">Service Title</label>
                    <input name="service" type="text" required className="input input-bordered w-full" />
                  </div>
                </div>

                {/* Section: Price */}
                <div>
                  <label className="label-text font-medium">Rate per Hour ($)</label>
                  <input name="price" type="number" min="1" required className="input input-bordered w-full" />
                </div>

                {/* Section: Description */}
                <div>
                  <label className="label-text font-medium">Service Description</label>
                  <textarea name="description" rows="4" required className="textarea textarea-bordered w-full" placeholder="What do you offer, and who is it for?" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Service Images</label>

                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    className="file-input file-input-bordered w-full"
                  />

                  {/* Preview grid (replace src with dynamic preview later) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    <div className="w-full aspect-square overflow-hidden rounded-lg border">
                      <img
                        src="https://via.placeholder.com/150"
                        alt="preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-full aspect-square overflow-hidden rounded-lg border">
                      <img
                        src="https://via.placeholder.com/150"
                        alt="preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Add more <div>s dynamically once you hook up state */}
                  </div>
                </div>


                {/* Section: Preview Avatar (Static for now) */}
                <div className="flex items-center gap-4">
                  <img src="https://img.daisyui.com/images/profile/demo/5@94.webp" className="w-16 h-16 rounded-full object-cover" alt="Avatar" />
                  <p className="text-sm text-gray-600">Default avatar shown — customize later in profile settings</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={() => setAddListing(false)} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
            </div>
          </div>
        )}


        {showListingSuccess && (<div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-60">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-green-600">Success!</h3>
            <p className="py-4">Your listing has been added successfully.</p>
            <div className="modal-action">
              <button className="btn btn-success" onClick={() => {
                setShowListingSuccess(false);
                setAddListing(false);
              }}>
                OK
              </button>
            </div>
          </div>
        </div>)}


      </div>

    </>
  )
}

export default MyListings
