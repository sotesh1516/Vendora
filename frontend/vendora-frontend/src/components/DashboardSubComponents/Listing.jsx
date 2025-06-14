import React, { useState } from 'react'
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';

function Listing() {
  const location = useLocation();
  const listing = location.state?.listing;

  const [booking, setBooking] = useState(false);

  //might need to get the timeslots

  const [bookingInfo, setBookingInfo] = useState({
    timeslot: "",
    description: "",
  });

  const handleBooking = () => {

  }
  return (
    <div>
      <Navbar />

<div className="max-w-6xl mx-auto px-4 py-6">
  {/* Title and Rating */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
  <div className="flex flex-col md:flex-row md:items-baseline gap-1">
    <h1 className="text-2xl font-bold">{listing.serviceName}</h1>
    <span className="text-sm text-gray-500 md:ml-2">{listing.serviceProvider}</span>
  </div>
    <div className="mt-2 md:mt-0 text-sm text-gray-600">
      ⭐ {listing.rating} ({listing.reviewers})
    </div>
  </div>

  {/* Image Gallery */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
    <img src="https://via.placeholder.com/300" className="rounded-lg object-cover" />
    <img src="https://via.placeholder.com/300" className="rounded-lg object-cover" />
    <img src="https://via.placeholder.com/300" className="rounded-lg object-cover" />
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Left Side: Main Info */}
    <div className="lg:col-span-2 space-y-6">
      {/* Overview */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Service Overview</h2>
        <p className="text-sm text-gray-700">
          {listing.description}
        </p>
      </section>

      {/* Service Types */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Service Options</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>1-on-1 Tutoring ($15/hr)</li>
          <li>Group Sessions ($10/hr per person)</li>
          <li>Homework Help</li>
        </ul>
      </section>

      {/* Reviews */}
      {/* You should use js map function as reviews is an array in the database */}
      <section> 
        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
        <div className="space-y-3">
          <div className="border rounded p-3">
            <p className="text-sm font-medium">Jane Doe</p>
            <p className="text-xs text-gray-500">⭐⭐⭐⭐⭐ - "Excellent teaching style!"</p>
          </div>
          <div className="border rounded p-3">
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-gray-500">⭐⭐⭐⭐ - "Very helpful with exam prep."</p>
          </div>
        </div>
      </section>
    </div>

    {/* Right Side: Booking + Provider */}
    <div className="space-y-4">
      {/* Booking Card */}
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h3 className="font-semibold mb-2">Book This Service</h3>
        <button onClick={
          () => {
            setBooking(true);
          }
        } className="btn btn-primary w-full">Book Now</button>
      </div>

      {/* Provider Info */}
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h3 className="font-semibold mb-2">About the Provider</h3>
        <p className="text-sm text-gray-700">
          Amina Yusuf is a math tutor with 4 years of experience tutoring college students in calculus and linear algebra.
        </p>
      </div>
    </div>
  </div>
</div>

{booking && (<div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
  <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl space-y-4">
    
    {/* Modal Header */}
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Book a Session</h2>
      <button onClick={
        () => {
          setBooking(false);
        }
      } className="text-xl text-gray-500 hover:text-black">&times;</button>
    </div>

    {/* Time Selection */}
    <div>
      <label className="block text-sm font-medium mb-1">Select a Time</label>
      <select className="select select-bordered w-full">
        <option value="">-- Choose a time --</option>
        <option>Monday 2:00 PM</option>
        <option>Tuesday 10:00 AM</option>
        <option>Wednesday 4:30 PM</option>
        <option>Friday 1:00 PM</option>
      </select>
    </div>

    {/* Service Summary */}
    <div>
      <label className="block text-sm font-medium mb-1">Brief Summary</label>
      <textarea
        className="textarea textarea-bordered w-full"
        rows="3"
        placeholder="Describe what you're hoping to get help with..."
      ></textarea>
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-2 pt-2 border-t">
      <button className="btn btn-ghost">Cancel</button>
      <button className="btn btn-primary">Confirm Booking</button>
    </div>
    
  </div>
</div>)}

    </div>
  )
}

export default Listing;
