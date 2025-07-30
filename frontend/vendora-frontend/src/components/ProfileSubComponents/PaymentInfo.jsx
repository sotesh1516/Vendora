import React, { useEffect, useState } from 'react';
import { registerCashApp } from '../../api/user';

function PaymentInfo() {
  const [cashAppHandle, setCashAppHandle] = useState("");
  const [venmoHandle, setVenmoHandle] = useState("");

  useEffect(() => {
    //fetch during initial load and update the states
  }, []);

  const handleClick = async () => {
    try {
      const updatedInfo = await registerCashApp();
    } catch (error) {
      
    }
  };

  const handleChange = (e) => {
    e.target.name === "cashApp" ? setCashAppHandle(e.target.value) : setVenmoHandle(e.target.value);
  };

  return (
    <div className="p-4">
      {/* Title Section */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Payment <span className="text-blue-600">Information</span>
        </h1>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Instructions */}
        <p className="text-sm text-gray-600">
          Add or update your payment handles so customers know how to send you money for your services.
        </p>

        {/* Payment Handles */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cash App Handle</label>
            <input
              type="text"
              name='cashApp'
              className="input input-bordered w-full"
              placeholder={cashAppHandle.trim() !== "" ? cashAppHandle : "$yourcashtag" }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venmo Handle</label>
            <input
              type="text"
              name='venmo'
              className="input input-bordered w-full"
              placeholder={venmoHandle.trim() !== "" ? venmoHandle : "@yourvenmo"}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <button className="btn btn-primary px-6" onClick={handleClick}>Save Payment Info</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
