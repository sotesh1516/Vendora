import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchUserBookings } from '../../api/user';
import { fetchListing } from '../../api/listing';
import { useAuth } from '../contexts/AuthContext';


function MyBookings() {
  const navigate = useNavigate();

  const [reschedule, setReschedule] = useState();

  const handleClick = () => {

  };

  const { accessToken } = useAuth();

  //this is to get access to the signed in user from useContext
  // const localCopyOfSignedInUser = signedInUser.user;
  //const setLocalCopyOfSignedUser = signedInUser.setUser;
  //const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  //this is to expand the scope of fetched user in the useEffect and keep a copy of myBooking array
  const [fetchedUserBookings, setFetchedUserBookings] = useState([]);

  const userInfo = {
    accessToken: accessToken,
  };

  useEffect(() => {
    const fetchUser = async (info) => {
      console.log("acces tok", accessToken);
      const response = await fetchUserBookings(info);

      if (response && response.user) {
        setFetchedUserBookings(response.user.myBookings);
      }
    };

    fetchUser(userInfo);

  }, []);

  const parseTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })

  };

  const handleNavigation = async () => {
    const navigationQuery = await fetchListing()
  }


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header Section */}
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Bookings</span>
                </h1>
                <p className="text-gray-600 mt-1">Track and manage your appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Upcoming Bookings */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming</h2>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {fetchedUserBookings.length}
              </div>
            </div>
            
            <div className="grid gap-4">
              {fetchedUserBookings.map((booking, index) => (
                <div
                  key={index}
                  className="
                    group bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 
                    hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer 
                    p-6 overflow-hidden
                  "
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  {/* Booking card */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Avatar with gradient ring */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                          <img
                            className="w-14 h-14 rounded-full object-cover bg-white"
                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                            alt="Provider"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-lg text-gray-900 truncate">{booking.listingId.serviceProvider}</div>
                        <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide truncate">{booking.listingId.serviceName}</div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{parseTime(booking.timeslot)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="font-semibold">${booking.listingId.ratePerHr}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>1 hour session</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        className="
                          px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
                          hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-105
                        "
                        onClick={(e) => {
                          e.stopPropagation();
                          setReschedule(true); // state trigger for reschedule modal
                        }}
                      >
                        Reschedule
                      </button>
                      <button
                        className="
                          px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 
                          hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105
                        "
                        onClick={(e) => {
                          e.stopPropagation();
                          // add cancel logic
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Bookings */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Completed</h2>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                1
              </div>
            </div>
            
            <div className="grid gap-4">
              <div
                className="
                  group bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 
                  hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer 
                  p-6 overflow-hidden relative
                "
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                {/* Completed badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Completed
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {/* Avatar with gradient ring */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                        <img
                          className="w-14 h-14 rounded-full object-cover bg-white"
                          src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                          alt="Provider"
                        />
                      </div>
                      {/* Completed checkmark */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg text-gray-900 truncate">John Doe</div>
                      <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide truncate">Physics Review</div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Friday, May 17</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="font-semibold">$30 total</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>2 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      className="
                        px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
                        hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-105
                      "
                      onClick={(e) => {
                        e.stopPropagation();
                        // add rebook logic
                      }}
                    >
                      Rebook
                    </button>
                    <button
                      className="
                        px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 
                        hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105
                      "
                      onClick={(e) => {
                        e.stopPropagation();
                        // add review logic
                      }}
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyBookings