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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Information</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage your payment methods</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Content Wrapper */}
        <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Payment Setup</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Add or update your payment handles so customers know how to send you money for your services.
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            
            {/* Payment Handles */}
            <div className="space-y-6">
              
              {/* Cash App Section */}
              <div className="bg-white/60 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cash App Handle</h4>
                    <p className="text-xs text-gray-600">Your unique Cash App identifier</p>
                  </div>
                </div>
                
                <input
                  type="text"
                  name='cashApp'
                  className="
                    w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                    focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                    placeholder-gray-400
                  "
                  placeholder={cashAppHandle.trim() !== "" ? cashAppHandle : "$yourcashtag"}
                  onChange={handleChange}
                />
                
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Include the $ symbol (e.g., $johnsmith)</span>
                </div>
              </div>

              {/* Venmo Section */}
              <div className="bg-white/60 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Venmo Handle</h4>
                    <p className="text-xs text-gray-600">Your unique Venmo username</p>
                  </div>
                </div>
                
                <input
                  type="text"
                  name='venmo'
                  className="
                    w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                    focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                    placeholder-gray-400
                  "
                  placeholder={venmoHandle.trim() !== "" ? venmoHandle : "@yourvenmo"}
                  onChange={handleChange}
                />
                
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Include the @ symbol (e.g., @johnsmith)</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Security Reminder</p>
                  <p className="text-xs text-gray-600">
                    Only share these payment handles with trusted customers. Never share sensitive banking information.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button 
                className="
                  px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl
                  hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400
                " 
                onClick={handleClick}
              >
                Save Payment Info
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          
          {/* Tips Card */}
          <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Use a professional-looking handle that matches your service name</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Test your handles before sharing with customers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Keep your payment apps updated for security</span>
              </li>
            </ul>
          </div>

          {/* Support Card */}
          <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.172a10 10 0 010 19.656 10 10 0 010-19.656z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Having trouble setting up your payment information? We're here to help!
            </p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;