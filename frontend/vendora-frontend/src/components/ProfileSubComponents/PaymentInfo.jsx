import React from 'react';

function PaymentInfo() {
  return (
    <>
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Payment Information</h1>

      {/* Summary Section */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
        <p className="text-sm text-gray-700">Service: Math Tutoring</p>
        <p className="text-sm text-gray-700">Provider: Amina Yusuf</p>
        <p className="text-sm text-gray-700">Date & Time: Tuesday, May 14, 2:00 PM</p>
        <p className="text-sm text-gray-700">Rate: $15/hr</p>
      </div>

      {/* Billing Details */}
      <div className="border rounded-lg p-4 space-y-4 bg-white">
        <h2 className="text-lg font-semibold">Billing Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" className="input input-bordered w-full" placeholder="Full Name" />
          <input type="email" className="input input-bordered w-full" placeholder="Email Address" />
          <input type="text" className="input input-bordered w-full" placeholder="Billing Address" />
          <input type="text" className="input input-bordered w-full" placeholder="ZIP / Postal Code" />
        </div>
      </div>

      {/* Payment Section (Stripe Card Input Placeholder) */}
      <div className="border rounded-lg p-4 space-y-4 bg-white">
        <h2 className="text-lg font-semibold">Card Information</h2>
        <div className="border rounded p-3 bg-gray-100">
          {/* Replace this div with Stripe CardElement */}
          <p className="text-sm text-gray-500 italic">Stripe Card Input will go here...</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary px-6">Update Payment Method</button>
      </div>
    </div>
    </>
  );
}

export default PaymentInfo;
