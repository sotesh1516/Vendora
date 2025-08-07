import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { bookListing } from '../../api/booking';
import { checkUserBookingStatusForListing, updateUserBooking } from '../../api/user';
import { fetchListing } from '../../api/listing';

export default function Listing() {
  const location = useLocation();
  //const listing = location.state?.listing;
  const { id } = useParams();// this is much beter that useLocation, and useParams return object so we need desctruction
  const [listing, setListing] = useState(null);

  const signedInUser = useContext(UserContext);
  const localCopyOfSignedInUser = signedInUser.user;

  const [booking, setBooking] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [newBookingToBeRegistered, setNewBookingToBeRegistered] = useState({
    listingId: id,
    customerId: localCopyOfSignedInUser.id,
    customerSummary: '',
    timeSlot: selectedTimeSlot,
    status: 'booked',
  });

  const [isRescheduleMode, setIsRescheduleMode] = useState(false);

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
          userId: localCopyOfSignedInUser.id,
          listingId: listing.id,
        });
  
        if (isBooked)
        {
          setIsRescheduleMode(true);
        }
      } catch (error) {
        
      }
    };

    if (id)
    {
      checkBookingStatus();
    }

  }, []);

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
          userId: localCopyOfSignedInUser.id,
          bookingId: registeredBooking.booking.id,
        };
        const check = await updateUserBooking(infoToBeUpdated);
        if (check && check.updatedUser) return check.updatedUser;
      }
    } catch (error) {
      console.error('Error during booking', error);
    }
  };

  if (!listing) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="text-center">
            <div className="text-lg">Loading listing...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Title and Rating */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {listing.serviceName}
            </h1>
            <p className="text-sm mt-1 text-gray-500">
              Provided by{' '}
              <span className="text-gray-800 font-semibold">
                {listing.serviceProvider}
              </span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            {listing.rating} ({listing.reviewers || 0} reviews)
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {(listing.cloudStoredImages.length > 0 ? listing.cloudStoredImages : [1, 2, 3]).map((image) => (
            <img
              key={image.public_id}
              src={listing.cloudStoredImages.length > 0 ? image.url : "https://via.placeholder.com/400x250"}
              alt="Preview"
              className="rounded-xl object-cover w-full h-60 shadow hover:shadow-lg transition-all duration-200"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Service Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {listing.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Service Options
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {(listing.serviceOptions || []).map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Reviews
              </h2>
              <div className="space-y-5">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition">
                  <p className="font-semibold text-gray-900">Jane Doe</p>
                  <p className="text-sm text-gray-500">
                    ⭐⭐⭐⭐⭐ &nbsp; “Amazing tutor, explains clearly.”
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition">
                  <p className="font-semibold text-gray-900">John Smith</p>
                  <p className="text-sm text-gray-500">
                    ⭐⭐⭐⭐ &nbsp; “Very helpful for my exam prep.”
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            {!isRescheduleMode ? (
              // BOOK NOW - Default state
              <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Book This Service
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Ready to get started? Book your session now!
                  </p>
                  <button
                    onClick={() => setBooking(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ) : (
              // RESCHEDULE - Alternative state
              <div className="bg-white border border-amber-200 rounded-xl shadow p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Reschedule Your Booking
                </h3>
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-800">
                      <span className="font-medium">Current booking:</span> Friday, Dec 15 at 2:00 PM
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Select a new time slot for your session.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBooking(true)}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                    >
                      Choose New Time
                    </button>
                    <button
                      onClick={() => setIsRescheduleMode(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                About the Provider
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Amina Yusuf is a math tutor with 4 years of experience tutoring
                college students in calculus and linear algebra.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {booking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Book a Session
              </h2>
              <button
                onClick={() => setBooking(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Time
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you need help with?
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
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

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setBooking(false)}
                className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleBookingSubmission}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showBookingSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg text-center space-y-4">
            <h3 className="text-lg font-bold text-green-600">✅ Success!</h3>
            <p className="text-gray-700">
              Your booking has been added successfully.
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                setShowBookingSuccess(false);
                setBooking(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
