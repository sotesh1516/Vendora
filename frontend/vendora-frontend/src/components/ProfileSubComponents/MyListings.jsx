import React, { useEffect, useRef, useState } from 'react'
import "../../index.css"
import { registerListing, deleteListingAPI} from "../../api/listing"
import { fetchUserListings, updateUserListingList } from '../../api/user';
import ListingEdit from './MyListingSubComponents/ListingEdit';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { whoAmI } from '../../api/auth';

function MyListings() {

  const navigate = useNavigate();
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
  const [addListing, setAddListing] = useState(false);

  //state for activating a modal for navigating listing 
  const [activeTab, setActiveTab] = useState("reviews");

  //state for activating a modal for editing listing
  const [editListing, setEditListing] = useState(false);

  //state for marking the listing to be updated 
  const [listingToBeUpdated, setListingToBeUpdated] = useState(null);

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

  //state for keeping track of the added images
  const [selectedImages, setSelectedImages] = useState([]);

  const parseTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })

  };

  const [newListingToRegister, setNewListingToRegister] = useState({
    name: "",
    service: "",
    serviceOpts: serviceOptions,
    timeSlotsAv: timeSlots,
    price: "",
    description: "",
    rating: [],
    avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    images: selectedImages,
  });

  //const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  const { accessToken } = useAuth();

  const [showSignInModal, setShowSignInModal] = useState(false);// reroute user to sign in if there is an engagement with a
  // restircted user

  // Critical action wrapper
  const withAuth = async (callback) => {
    if (!accessToken) {
      setShowSignInModal(true);
      return;
    }

    try {
      const authCheck = await whoAmI({ accessToken });
      if (!authCheck.authenticated) {
        setShowSignInModal(true);
        return;
      }
      // User is authenticated, execute the callback
      callback();
    } catch (error) {
      console.error('Auth check failed:', error);
      setShowSignInModal(true);
    }
  };

  useEffect(() => {
    const handleSubmission = async () => {
      try {
        console.log(newListingToRegister);
        const response = await registerListing(newListingToRegister, accessToken);
        //add the listingId to the user's array
        if (response && response.listing) {
          console.log(response.listing);
          setShowListingSuccess(true);
          const infoToBeUpdated = {
            accessToken: accessToken,
            listingId: response.listing._id,  //when doing the same exact thing on booking i did id and it worked but here i have to use _id which makes sense since i am not modifying the database response
          };

          //console.log(infoToBeUpdated);
          const updateResponse = await updateUserListingList(infoToBeUpdated);

          if (updateResponse && updateResponse.updatedUser) {
            console.log("listing added to mylisting");
            console.log(updateResponse.updatedUser);
          }

        }
      } catch (error) {
        console.log({ "error": error });
      }

      setListings((prev) => [...prev, newListingToRegister]);
    };

    if (shouldSubmit) {
      handleSubmission();
      setShouldSubmit(false);
    }

  }, [shouldSubmit]);


  useEffect(() => {
    const fetchCompleteUser = async (fetchParams) => {
      const check = await fetchUserListings(fetchParams);

      if (check && check.user) {
        // console.log(check.user.myListings);
        setListings(check.user.myListings);
      }
    };

    const userInfo = {
      accessToken: accessToken,
    };

    fetchCompleteUser(userInfo);
  }, []);

  //to update the final objet's image attribute
  useEffect(() => {
    setNewListingToRegister((prev) => ({
      ...prev,
      images: selectedImages,
    }));
  }, [selectedImages]);


  //effect to update listing when service options change
  useEffect(() => {
    setNewListingToRegister((prev) => ({
      ...prev,
      serviceOpts: serviceOptions,
    }));
  }, [serviceOptions]);



  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewListingToRegister({ ...newListingToRegister, [name]: value });
  }

  const handleSignIn = () => {
    setShowSignInModal(false);
    navigate('/signin'); // Adjust this path to your sign-in route
  };

  // Add this state to track which listing is being deleted
const [listingToDelete, setListingToDelete] = useState(null);

// Add this function before your return statement
const handleDelete = async (listingId) => {
  try {
    const result = await deleteListingAPI(listingId, accessToken);
    
    if (result.error) {
      // Handle error - you might want to show a toast notification here
      console.error("Delete failed:", result.message);
      alert(`Error: ${result.message}`);
    } else {
      // Success - remove from local state
      setListings((prev) => prev.filter((listing) => listing._id !== listingId));
      setDeleteListing(false);
      setListingToDelete(null);
      
      // Optional: Show success message
      console.log("Listing deleted successfully");
      // You could add a success toast here
    }
  } catch (error) {
    console.error("Delete failed:", error);
    alert("An unexpected error occurred while deleting the listing.");
  }
};

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header Section */}
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Listings</span>
                </h1>
                <p className="text-gray-600 mt-1">Manage your service offerings</p>
              </div>
              <button
                className="
                  px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-sm 
                  shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400
                "
                onClick={() => {
                  withAuth(() => setAddListing(true));
                }}
              >
                + New Listing
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Listings Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
              //card for each listing
              <div
                key={listing._id || listing.id}
                onClick={() => setSelectedListing(listing)}
                className="
                  group bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 
                  hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer 
                  p-6 flex flex-col overflow-hidden
                "
              >
                {/* Manage Badge */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/manage/${listing._id}`);
                  }}
                  className="
    absolute top-4 right-4 
    bg-gradient-to-r from-blue-500 to-indigo-500
    text-white text-xs font-semibold px-3 py-1 
    rounded-full shadow-md backdrop-blur-sm
    hover:shadow-lg hover:scale-105 transition-all cursor-pointer
  "
                >
                  Manage
                </button>
                {/* Listing card header */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar with gradient ring */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                      <img
                        className="w-12 h-12 rounded-full object-cover bg-white"
                        src={listing.avatar || "https://img.daisyui.com/images/profile/demo/5@94.webp"}
                        alt="Service Provider"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{listing.serviceProvider || listing.name}</p>
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide truncate">{listing.serviceName || listing.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 flex-grow line-clamp-3 mb-4">{listing.description}</p>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-medium text-gray-700">{listing.rating || 4.8}</span>
                    <span className="text-gray-400 text-xs">({listing.reviewsCount || 0})</span>
                  </div>
                  <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ${listing.ratePerHr || 0}/hr
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    className="
                      flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 
                      hover:bg-blue-100 rounded-lg transition-colors duration-200
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      setListingToBeUpdated(listing);
                      setEditListing(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="
                      flex-1 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 
                      hover:bg-red-100 rounded-lg transition-colors duration-200
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      setListingToDelete(listing); // Set which listing to delete
                      setDeleteListing(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="
                      px-3 py-2 text-gray-600 hover:text-red-500 hover:bg-gray-50 
                      rounded-lg transition-colors duration-200
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      setFavorite(!favorite);
                      //work on change the classnames
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={favorite ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.5-1.5 3-3.25 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5C2 10.75 3.5 12.5 5 14l7 7z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* this is where the modal for a listing activates */}
        {selectedListing && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm overflow-y-auto">
            <div className="min-h-screen flex items-start justify-center p-4 py-8">
              <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-6xl my-8 rounded-2xl shadow-2xl border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {selectedListing.title || "Service Title"}
                  </h2>
                  <button
                    onClick={() => setSelectedListing(null)}
                    className="
                    w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                    text-gray-500 hover:text-gray-700 transition-colors duration-200
                    flex items-center justify-center
                  "
                  >
                    ✕
                  </button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                  {/* Left: Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Images - Only Cloud Stored Images */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {/* Only show cloud images from the listing */}
                      {selectedListing.cloudStoredImages && selectedListing.cloudStoredImages.length > 0 ? (
                        selectedListing.cloudStoredImages.map((image, index) => (
                          <div key={`cloud-${index}`} className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                            <img src={image.url} alt={`Service ${index + 1}`} className="w-full h-56 object-cover" />
                          </div>
                        ))
                      ) : (
                        // Show placeholder if no cloud images
                        <>
                          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                            <img
                              src="https://via.placeholder.com/400x250"
                              alt="Preview"
                              className="w-full h-56 object-cover"
                            />
                          </div>
                          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                            <img
                              src="https://via.placeholder.com/400x250"
                              alt="Preview"
                              className="w-full h-56 object-cover"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <section className="bg-white/60 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Service Overview</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedListing.description || "No description provided."}
                      </p>
                    </section>

                    {/* Service Options */}
                    <section className="bg-white/60 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Service Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedListing.serviceOptions || ["No options listed"]).map((opt, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* Reviews */}
                    <section className="bg-white/60 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Client Reviews</h3>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                          <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                          <p className="text-xs text-gray-600 mt-1">⭐⭐⭐⭐⭐ "Amazing tutor, explains clearly."</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                          <p className="text-sm font-medium text-gray-900">John Smith</p>
                          <p className="text-xs text-gray-600 mt-1">⭐⭐⭐⭐ "Very helpful for my exam prep."</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Right: Owner Controls */}
                  <div className="space-y-6">
                    {/* Provider Info */}
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-5 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                            <img
                              src={selectedListing.avatar}
                              className="w-14 h-14 rounded-full object-cover bg-white"
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{selectedListing.name}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <span className="text-yellow-400">⭐</span>
                            <span>{selectedListing.rating}</span>
                            <span>({selectedListing.reviewsCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        className="
                        w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl
                        hover:shadow-lg transition-all duration-200 hover:scale-105
                      "
                        onClick={() => {
                          setListingToBeUpdated(selectedListing);
                          setEditListing(true);
                          setSelectedListing(null); // hide this modal first
                        }}
                      >
                        Edit Listing
                      </button>
                      <button
                        className="
                        w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl
                        hover:shadow-lg transition-all duration-200 hover:scale-105
                      "
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
          </div>
        )}


        {editListing && listingToBeUpdated && (
          <ListingEdit
            listing={listingToBeUpdated}
            setEditListing={setEditListing}
            key={listingToBeUpdated._id || listingToBeUpdated.id}
          />
        )}


        {deleteListing && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Delete Listing</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this listing? This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    className="
                      flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 
                      rounded-xl font-medium transition-colors duration-200
                    "
                    onClick={() => setDeleteListing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="
                      flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white 
                      rounded-xl font-medium hover:shadow-lg transition-all duration-200
                    "
                    onClick={() => {
                      if (listingToDelete) {
                        handleDelete(listingToDelete._id || listingToDelete.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {addListing && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 p-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Create New Service Listing
                  </h2>
                  <button
                    onClick={() => setAddListing(false)}
                    className="
                      w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                      text-gray-500 hover:text-gray-700 transition-colors duration-200
                      flex items-center justify-center
                    "
                  >
                    ✕
                  </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-6">

                  {/* Section: Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="
                          w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                          focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                        "
                        value={newListingToRegister.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
                      <input
                        name="service"
                        type="text"
                        required
                        className="
                          w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                          focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                        "
                        value={newListingToRegister.service}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Section: Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rate per Hour ($)</label>
                    <input
                      name="price"
                      type="number"
                      min="1"
                      required
                      className="
                        w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                        focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                      "
                      value={newListingToRegister.price}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Section: Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Description</label>
                    <textarea
                      name="description"
                      rows="4"
                      required
                      className="
                        w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                        focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none
                      "
                      placeholder="What do you offer, and who is it for?"
                      value={newListingToRegister.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Time Slots Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Available Time Slots</label>

                    <div className="flex gap-2 mb-4">
                      <input
                        type="datetime-local"
                        className="
                          flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                          focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                        "
                        placeholder="Select a date and time"
                        id="date-time-input"
                        value={timeSlot}
                        onChange={(event) => {
                          setTimeSlot(event.target.value);
                        }}
                      />

                      <button
                        type="button"
                        className="
                          px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl
                          hover:shadow-lg transition-all duration-200 hover:scale-105
                        "
                        onClick={() => {
                          //const value = document.getElementById("date-time-input").value;
                          const updatedTimeSlots = [...timeSlots, timeSlot]
                          setTimeSlots(updatedTimeSlots);
                          setNewListingToRegister(prev => ({
                            ...prev,
                            timeSlotsAv: updatedTimeSlots
                          }));
                          console.log("Time Slot", timeSlot)
                          console.log("Time Slots", timeSlots);
                        }}
                      >
                        Add
                      </button>
                    </div>

                    {/* Display of added time slots */}
                    <div className="space-y-2">
                      {timeSlots.map((slot, index) => (
                        <div key={index} className="p-3 rounded-lg bg-white/80 border border-gray-200 text-sm text-gray-700">
                          {parseTime(slot)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Options Section */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Service Options</label>

                    <div className="space-y-3">
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
                            className="
                              flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                              focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                            "
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = [...serviceOptions];
                              newOptions.splice(index, 1); // remove this item
                              setServiceOptions(newOptions);
                            }}
                            className="
                              px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white 
                              rounded-xl hover:shadow-lg transition-all duration-200
                            "
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Add new input */}
                      <button
                        type="button"
                        className="
                          w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 
                          rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors duration-200
                        "
                        onClick={() => {
                          setServiceOptions([...serviceOptions, ""])
                          //console.log(serviceOptions);
                        }}
                      >
                        + Add Option
                      </button>
                    </div>
                  </div>

                  {/* Images Section */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Service Images</label>

                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      className="
                        w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                        focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                        file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                        file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                      "
                      onChange={(e) => {
                        //A filelist is an array like objects 
                        //need to convert (or destructure/spread) that FileList into individual File objects 
                        // before merging with your existing selectedImages array
                        //Array.from takes in an array like object and converts to an array
                        const files = Array.from(e.target.files);
                        const newTotal = selectedImages.length + files.length;

                        if (newTotal !== 3) {
                          alert(`Please select exactly 3 images. You currently have ${newTotal} image(s).`);
                          return;
                        }

                        setSelectedImages((prev) => [...prev, ...files]);
                      }}
                    />

                    {/* Preview grid - Show selectedImages or placeholders */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {selectedImages.length > 0 ? (
                        // Show actual selected images
                        selectedImages.map((file, index) => (
                          <div key={index} className="relative aspect-square overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-50">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Selected ${index + 1}`}
                              className="object-cover w-full h-full rounded-xl"
                            />
                            <button
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-sm font-bold transition-all duration-200"
                              onClick={() => {
                                setSelectedImages(prev => prev.filter((_, i) => i !== index));
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))
                      ) : (
                        // Show placeholders when no images selected
                        <>
                          <div className="aspect-square overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                            <img
                              src="https://via.placeholder.com/150"
                              alt="preview"
                              className="object-cover w-full h-full rounded-xl"
                            />
                          </div>
                          <div className="aspect-square overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                            <img
                              src="https://via.placeholder.com/150"
                              alt="preview"
                              className="object-cover w-full h-full rounded-xl"
                            />
                          </div>
                          <div className="aspect-square overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Preview</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Section: Preview Avatar */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                          className="w-16 h-16 rounded-full object-cover bg-white"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Default Avatar</p>
                      <p className="text-xs text-gray-600">Customize later in profile settings</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setAddListing(false)}
                      className="
                        flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 
                        rounded-xl font-medium transition-colors duration-200
                      "
                    >
                      Cancel
                    </button>
                    <button
                      className="
                        flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                        rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105
                      "
                      onClick={(e) => {
                        e.preventDefault();
                        setShouldSubmit(true)
                      }}
                    >
                      Publish Listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}


        {showListingSuccess && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-60 p-4">
            <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600 mb-6">Your listing has been added successfully.</p>
                <button
                  className="
                    w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                    rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105
                  "
                  onClick={() => {
                    setShowListingSuccess(false);
                    setAddListing(false);
                  }}
                >
                  Perfect!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sign In Required Modal */}
        {showSignInModal && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
              <div className="p-8 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-2">Sign In Required</h3>
                <p className="text-gray-600 mb-6">Please sign in to add items to your favorites</p>

                <div className="flex gap-3">
                  <button
                    className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200"
                    onClick={() => setShowSignInModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default MyListings