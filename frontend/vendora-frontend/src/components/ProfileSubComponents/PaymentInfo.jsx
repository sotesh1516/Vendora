import React from 'react';

function PaymentInfo() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Payment Information</h1>

      {/* Instructions */}
      <p className="text-sm text-gray-600">
        Add your payment handle so customers know how to send you money for your services.
      </p>

      {/* Payment Handles */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cash App Handle</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="$yourcashtag"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Venmo Handle</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="@yourvenmo"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary px-6">Save Payment Info</button>
      </div>
    </div>
  );
}

export default PaymentInfo;
