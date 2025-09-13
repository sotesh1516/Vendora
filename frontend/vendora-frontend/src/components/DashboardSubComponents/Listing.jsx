import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { bookListing } from '../../api/booking';
import { checkUserBookingStatusForListing, updateUserBooking } from '../../api/user';
import { fetchListing } from '../../api/listing';
import { useAuth } from '../contexts/AuthContext';

export default function Listing() {
  const location = useLocation();
  //const listing = location.state?.listing;
  const { id } = useParams();// this is much beter that useLocation, and useParams return object so we need desctruction
  const [listing, setListing] = useState(null);

  const signedInUser = useContext(UserContext);
  //const localCopyOfSignedInUser = signedInUser.user;
  const { accessToken } = useAuth();

  const [booking, setBooking] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [newBookingToBeRegistered, setNewBookingToBeRegistered] = useState({
    listingId: id,
    customerId: "",
    customerSummary: '',
    timeSlot: selectedTimeSlot,
    status: 'booked',
    accessToken: accessToken,
  });

  const [isRescheduleMode, setIsRescheduleMode] = useState(false);

  const [showSignInModal, setShowSignInModal] = useState(false);// reroute user to sign in if there is an engagement with a
  // restircted user

  const handleSignIn = () => {
    setShowSignInModal(false);
    navigate('/signin'); // Adjust this path to your sign-in route
  };

  useEffect(() => {
    const fetchSingleListing = async () => {
      const returnedListing = await fetchListing(id);

      if (returnedListing && returnedListing.fetchedListing) {
        setListing(returnedListing.fetchedListing)
      }
    };

    if (id) { // Only fetch if id exists
      fetchSingleListing();
    }

  }, [id]);

  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        const isBooked = await checkUserBookingStatusForListing({
          accessToken: accessToken,
          listingId: listing._id,
        });

        if (isBooked.booked) {
          setIsRescheduleMode(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id && listing && listing._id) {
      console.log("line 52", listing);
      checkBookingStatus();
    }

  }, [listing]); // make sure listing is loaded

  const parseTime = (isoTime) => {
    return new Date(isoTime).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const handleBookingSubmission = async () => {
    try {
      const registeredBooking = await bookListing(newBookingToBeRegistered);
      if (registeredBooking && registeredBooking.booking) {
        setShowBookingSuccess(true);
        const infoToBeUpdated = {
          accessToken: accessToken,
          bookingId: registeredBooking.booking._id,
        };
        const check = await updateUserBooking(infoToBeUpdated);
        if (check && check.updatedUser) {
          return check.updatedUser;
        }
      }
    } catch (error) {
      console.error('Error during booking', error);
    }
  };

  const openImageGallery = (index) => {
    setSelectedImageIndex(index);
    setShowImageGallery(true);
  };

  const nextImage = () => {
    const totalImages = listing.cloudStoredImages.length > 0 ? listing.cloudStoredImages.length : 3;
    setSelectedImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    const totalImages = listing.cloudStoredImages.length > 0 ? listing.cloudStoredImages.length : 3;
    setSelectedImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <Navbar />
        </div>
        <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="text-lg font-semibold text-gray-900">Loading listing...</div>
            <div className="text-sm text-gray-600 mt-1">Please wait while we fetch the details</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title and Rating */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {listing.serviceName}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span>Provided by</span>
                <span className="font-semibold text-blue-600">
                  {listing.serviceProvider}
                </span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-gray-900">{listing.rating}</span>
              <span className="text-gray-500">({listing.reviewers || 0} reviews)</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {(listing.cloudStoredImages.length > 0 ? listing.cloudStoredImages : [1, 2, 3]).map((image, index) => (
            <div
              key={image.public_id || index}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openImageGallery(index)}
            >
              <img
                src={listing.cloudStoredImages.length > 0 ? image.url : "https://via.placeholder.com/400x250"}
                alt="Preview"
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Service Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {listing.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Service Options
              </h2>
              <div className="space-y-3">
                {(listing.serviceOptions || []).map((opt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{opt}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Jane Doe</p>
                      <div className="flex text-yellow-400">
                        {'⭐'.repeat(5)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">"Amazing tutor, explains clearly."</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">JS</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">John Smith</p>
                      <div className="flex text-yellow-400">
                        {'⭐'.repeat(4)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">"Very helpful for my exam prep."</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            {!isRescheduleMode ? (
              // BOOK NOW - Default state
              <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl border border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Book This Service
                </h3>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <span className="text-3xl font-bold text-blue-600">${listing.ratePerHr || 0}</span>
                    <span className="text-gray-600"> / hour</span>
                  </div>
                  <p className="text-gray-600 text-center">
                    Ready to get started? Book your session now!
                  </p>
                  <button
                    onClick={() => setBooking(true)}
                    className="
                      w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl
                      hover:shadow-lg transition-all duration-200 hover:scale-105
                    "
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ) : (
              // RESCHEDULE - Alternative state
              <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl border border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Reschedule Your Booking
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Current booking:</p>
                    <p className="font-semibold text-gray-900">Friday, Dec 15 at 2:00 PM</p>
                  </div>
                  <p className="text-gray-600">
                    Select a new time slot for your session.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBooking(true)}
                      className="
                        flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl
                        hover:shadow-lg transition-all duration-200 hover:scale-105
                      "
                    >
                      Choose New Time
                    </button>
                    <button
                      onClick={() => setIsRescheduleMode(false)}
                      className="
                        px-4 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl
                        hover:bg-gray-200 transition-colors duration-200
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                About the Provider
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">AY</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{listing.serviceProvider}</p>
                  <p className="text-sm text-gray-600">Service Provider</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Amina Yusuf is a math tutor with 4 years of experience tutoring
                college students in calculus and linear algebra.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-full flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setShowImageGallery(false)}
              className="
                absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 
                text-white transition-colors duration-200 flex items-center justify-center
              "
            >
              ✕
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="
                absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                bg-black/50 hover:bg-black/70 text-white transition-colors duration-200 
                flex items-center justify-center
              "
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="
                absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                bg-black/50 hover:bg-black/70 text-white transition-colors duration-200 
                flex items-center justify-center
              "
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main image container */}
            <div className="flex-1 flex items-center justify-center mb-24">
              <img
                src={
                  listing.cloudStoredImages.length > 0
                    ? listing.cloudStoredImages[selectedImageIndex]?.url
                    : "https://via.placeholder.com/800x600"
                }
                alt={`Gallery image ${selectedImageIndex + 1}`}
                className="w-[500px] h-auto max-h-[90%] object-contain rounded-lg" //prev max-w-full max-h-full
              />
            </div>

            {/* Bottom section with counter and thumbnails */}
            <div className="absolute bottom-4 left-0 right-0">
              {/* Image counter */}
              <div className="flex justify-center mb-4">
                <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImageIndex + 1} / {listing.cloudStoredImages.length > 0 ? listing.cloudStoredImages.length : 3}
                </div>
              </div>

              {/* Thumbnail navigation */}
              <div className="flex justify-center">
                <div className="flex gap-2 max-w-md overflow-x-auto px-4">
                  {(listing.cloudStoredImages.length > 0 ? listing.cloudStoredImages : [1, 2, 3]).map((image, index) => (
                    <button
                      key={image.public_id || index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`
                        flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200
                        ${selectedImageIndex === index ? 'border-white' : 'border-transparent opacity-60 hover:opacity-80'}
                      `}
                    >
                      <img
                        src={listing.cloudStoredImages.length > 0 ? image.url : "https://via.placeholder.com/64x64"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {booking && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book a Session
                </h2>
                <button
                  onClick={() => setBooking(false)}
                  className="
                    w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                    text-gray-500 hover:text-gray-700 transition-colors duration-200
                    flex items-center justify-center
                  "
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select a Time
                  </label>
                  <select
                    className="
                      w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                    "
                    value={selectedTimeSlot}
                    onChange={(e) => {
                      setSelectedTimeSlot(e.target.value);
                      setNewBookingToBeRegistered({
                        ...newBookingToBeRegistered,
                        timeSlot: e.target.value,
                      });
                    }}
                  >
                    <option>-- Choose a time --</option>
                    {(listing.timeSlots || []).map((slot, i) => (
                      <option key={i} value={slot}>
                        {parseTime(slot)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What do you need help with?
                  </label>
                  <textarea
                    className="
                      w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none
                    "
                    rows="4"
                    placeholder="Describe your issue or goal..."
                    value={newBookingToBeRegistered.customerSummary}
                    onChange={(event) =>
                      setNewBookingToBeRegistered({
                        ...newBookingToBeRegistered,
                        customerSummary: event.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setBooking(false)}
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
                  onClick={handleBookingSubmission}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showBookingSuccess && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">
                Your booking has been added successfully.
              </p>
              <button
                className="
                  w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                  rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105
                "
                onClick={() => {
                  setShowBookingSuccess(false);
                  setBooking(false);
                }}
              >
                Perfect!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}