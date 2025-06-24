import React, { useContext, useState } from 'react';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { bookListing } from '../../api/booking';

function Listing() {
  const location = useLocation();
  const listing = location.state?.listing;

  //this will be used to access a user transferred through useContext when signed in.
  const signedInUser = useContext(UserContext);

  const localCopyOfSignedInUser = signedInUser.user;
  //i dont think i did the useState setter, but i will keep it for now
  const localCopyOfSetSignedInUser = signedInUser.setUser;

  const [booking, setBooking] = useState(false);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [newBookingToBeRegistered, setNewBookingToBeRegistered] = useState({
    listingId: listing._id,
    customerId: localCopyOfSignedInUser._id,
    customerSummary: "",
    timeSlot: selectedTimeSlot,
    status: "pending",
  });


  const parseTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })

  };

  const handleBookingSubmission = async () => {
    try {
      const registeredBooking = await bookListing(newBookingToBeRegistered);

    if (registeredBooking && registeredBooking.booking)
    {

    }
    } catch (error) {
      console.error("Error during booking", error);
    }
    
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Title and Rating */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">{listing.serviceName}</h1>
            <p className="text-md text-gray-500">Provided by <span className="text-gray-800 font-medium">{listing.serviceProvider}</span></p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            ⭐ {listing.rating} ({listing.reviewers || 0} reviews)
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((_, i) => (
            <img
              key={i}
              src="https://via.placeholder.com/400x250"
              alt="Preview"
              className="rounded-2xl object-cover w-full h-60 shadow-md hover:shadow-lg transition"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Service Overview</h2>
              <p className="text-gray-700 text-base leading-relaxed">{listing.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Service Options</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
                {(listing.serviceOptions || []).map((opt, i) => <li key={i}>{opt}</li>)}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Reviews</h2>
              <div className="space-y-5">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                  <p className="font-semibold text-base text-gray-900">Jane Doe</p>
                  <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐ "Amazing tutor, explains clearly."</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                  <p className="font-semibold text-base text-gray-900">John Smith</p>
                  <p className="text-sm text-gray-500">⭐⭐⭐⭐ "Very helpful for my exam prep."</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book This Service</h3>
              <button
                onClick={() => setBooking(true)}
                className="btn btn-primary w-full text-white text-sm font-medium"
              >
                Book Now
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">About the Provider</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Amina Yusuf is a math tutor with 4 years of experience tutoring college students in calculus and linear algebra.
              </p>
            </div>
          </div>
        </div>
      </div>

      {booking && (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Book a Session</h2>
              <button
                onClick={() => setBooking(false)}
                className="text-2xl text-gray-400 hover:text-black"
              >
                &times;
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a Time</label>
              <select className="select select-bordered w-full" >
                <option onChange={(e) => {setSelectedTimeSlot(e.target.value)}}>-- Choose a time --</option>
                {(listing.timeSlots || []).map((slot, i) => (
                  <option key={i} value={slot}>{parseTime(slot)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What do you need help with?</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Describe your issue or goal..."
                value={newBookingToBeRegistered.customerSummary}
                onChange={(event) => {
                  setNewBookingToBeRegistered(event.target.value);
                }}
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-primary text-white" onClick={handleBookingSubmission}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
