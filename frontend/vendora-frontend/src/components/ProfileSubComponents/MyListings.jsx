import React, { useEffect, useRef, useState } from 'react'
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

  const [shouldSubmit, setShouldSubmit] = useState(false);

  //this is temp, used for selecting one listing out of the listings array usestate
  const listing = listings[0]

  //state for setting the listing to be displayed using a modal
  const [selectedListing, setSelectedListing] = useState();

  //ste for activating the list adding feature
  const [addListing, setAddListing] = useState();

  //state for activating a modal for navigating listing 
  const [activeTab, setActiveTab] = useState("reviews");

  //state for activating a modal for editing listing
  const [editListing, setEditListing] = useState(false);

  //state for changing the heart/favorite icon 
  const [favorite, setFavorite] = useState(false);

  //state for activating a modal for deleting listing
  const [deleteListing, setDeleteListing] = useState(false);

  //state for activating a modal that shows listing success
  const [showListingSuccess, setShowListingSuccess] = useState(false);

  //state to keep track of service option for a single listing
  const [serviceOptions, setServiceOptions] = useState(["e.g., Calculus"]);

  //state for keeping track of time slots
  const [timeSlots, setTimeSlots] = useState([]);

  //state for controlling single timeslot pick
  const [timeSlot, setTimeSlot] = useState("");

  const parseTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })

  };

  return (
    <>

      <div className="p-4 space-y-4">
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
        <div onClick={() => setSelectedListing(listing)} className="rounded-xl border border-gray-200 p-4 hover:bg-blue-50 hover:shadow-md cursor-pointer bg-white transition"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between  transition px-1 py-3 rounded-lg gap-4">
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

              <button className="btn btn-square btn-ghost" title="Favorite" onClick={(e) => {
                e.stopPropagation();
                setFavorite(!favorite);
                //work on change the classnames
              }}>
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={favorite ? "grey" : "none"}
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.5-1.5 3-3.25 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5C2 10.75 3.5 12.5 5 14l7 7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* this is where the modal for a listing activates */}
        {selectedListing && (
          <div className="fixed inset-0 z-50 bg-transparent bg-opacity-30 flex items-center justify-center overflow-auto">
            <div className="bg-white w-[90%] max-w-6xl rounded-xl shadow-lg p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h2 className="text-2xl font-bold text-gray-800">{selectedListing.title || "Service Title"}</h2>
                <button
                  onClick={() => setSelectedListing(null)}
                  className="text-gray-400 hover:text-black text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Image Banner */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img
                      src="https://via.placeholder.com/400x250"
                      alt="Preview"
                      className="rounded-lg object-cover w-full h-56"
                    />
                    <img
                      src="https://via.placeholder.com/400x250"
                      alt="Preview"
                      className="rounded-lg object-cover w-full h-56"
                    />
                  </div>

                  {/* Description */}
                  <section>
                    <h3 className="text-lg font-semibold mb-2">Service Overview</h3>
                    <p className="text-sm text-gray-700">
                      {selectedListing.description || "No description provided."}
                    </p>
                  </section>

                  {/* Service Options */}
                  <section>
                    <h3 className="text-lg font-semibold mb-2">Service Options</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {(selectedListing.options || ["No options listed"]).map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </section>

                  {/* Reviews */}
                  <section>
                    <h3 className="text-lg font-semibold mb-2">Client Reviews</h3>
                    <div className="space-y-3">
                      <div className="border rounded p-3 bg-gray-50">
                        <p className="text-sm font-medium">Jane Doe</p>
                        <p className="text-xs text-gray-500">⭐⭐⭐⭐⭐ “Amazing tutor, explains clearly.”</p>
                      </div>
                      <div className="border rounded p-3 bg-gray-50">
                        <p className="text-sm font-medium">John Smith</p>
                        <p className="text-xs text-gray-500">⭐⭐⭐⭐ “Very helpful for my exam prep.”</p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right: Owner Controls */}
                <div className="space-y-6">
                  {/* Provider Info */}
                  <div className="border p-4 rounded-lg shadow-sm bg-white">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={selectedListing.avatar}
                        className="w-14 h-14 rounded-full object-cover"
                        alt="Avatar"
                      />
                      <div>
                        <p className="font-semibold text-sm">{selectedListing.name}</p>
                        <p className="text-xs text-gray-500">⭐ {selectedListing.rating} ({selectedListing.reviewsCount} reviews)</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      className="btn btn-outline w-full"
                      onClick={() => {
                        setEditListing(true);
                        setSelectedListing(null); // hide this modal first
                      }}
                    >
                      Edit Listing
                    </button>
                    <button
                      className="btn btn-error btn-outline w-full"
                      onClick={() => {
                        setDeleteListing(true);
                        setSelectedListing(null);
                      }}
                    >
                      Delete Listing
                    </button>
                  </div>
                </div>
              </div>
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
                      serviceOpts: serviceOptions,
                      timeSlotsAv: timeSlots,
                      price: parseFloat(e.target.price.value),
                      description: e.target.description.value,
                      rating: [],
                      avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
                    };

                    //console.log(newListing.timeSlotsAv)

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
                      <label className="block text-lg font-medium text-gray-700">Your Name</label>
                      <input name="name" type="text" required className="input input-bordered w-full" />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700">Service Title</label>
                      <input name="service" type="text" required className="input input-bordered w-full" />
                    </div>
                  </div>

                  {/* Section: Price */}
                  <div>
                    <label className="block text-m font-medium text-gray-700">Rate per Hour ($)</label>
                    <input name="price" type="number" min="1" required className="input input-bordered w-full" />
                  </div>

                  {/* Section: Description */}
                  <div>
                    <label className="block text-m font-medium text-gray-700">Service Description</label>
                    <textarea name="description" rows="4" required className="textarea textarea-bordered w-full" placeholder="What do you offer, and who is it for?" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-m font-medium text-gray-700">Available Time Slots</label>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Add Available Time Slots</label>

                      <div className="flex gap-2">
                        <input
                          type="datetime-local"
                          className="input input-bordered w-full"
                          placeholder="Select a date and time"
                          id="date-time-input"
                          value={timeSlot}
                          onChange={(event) => {
                            setTimeSlot(event.target.value);
                          }}
                        />

                      
                        <button type="button" className="btn btn-primary" onClick={() => {
                          //const value = document.getElementById("date-time-input").value;
                          setTimeSlots([...timeSlots, timeSlot]);
                          console.log(timeSlots);
                        }}>
                          Add
                        </button>
                      </div>

                      {/* Display of added time slots — can later be connected to state */}
                      <div className="flex flex-col gap-2 mt-2">
                        {timeSlots.map((slot) => (
                          <div className="p-2 rounded-lg border bg-gray-50 text-sm text-gray-700">{parseTime(slot)}</div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="space-y-2">
                    <label className="block text-m font-medium text-gray-700">Service Images</label>

                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      className="file-input file-input-bordered w-full"
                    />

                    <div>
                      <label className="block text-m font-medium text-gray-700 pb-2">Service Options</label>
                      <div className="space-y-2">
                        {/* Map each input on its own row */}
                        {serviceOptions.map((service, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              name="serviceOptions[]"
                              placeholder="e.g., Algebra, Calculus..."
                              value={service}
                              onChange={(e) => {
                                const newOptions = [...serviceOptions];
                                newOptions[index] = e.target.value;
                                setServiceOptions(newOptions);  // even if i come back to change one input, the entire state array gets updated
                              }}
                              className="input input-bordered w-full"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newOptions = [...serviceOptions];
                                newOptions.splice(index, 1); // remove this item
                                setServiceOptions(newOptions);
                              }}
                              className="btn btn-error btn-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ))}

                        {/* Add new input */}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline mt-1"
                          onClick={() => setServiceOptions([...serviceOptions, ""])}
                        >
                          + Add
                        </button>
                      </div>

                    </div>


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
