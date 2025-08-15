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
      <div className="p-4 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            My <span className="text-blue-600">Bookings</span>
          </h2>
        </div>

        <div className="space-y-10">
          {/* Example: Upcoming Bookings */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Upcoming</h3>
            <div className="space-y-4">
              {fetchedUserBookings.map((booking, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 hover:border-blue-400 p-4 hover:bg-blue-50 hover:shadow-md cursor-pointer bg-white transition"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  {/* Booking card */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between transition rounded-lg gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Provider"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow">
                      <div className="font-semibold text-base text-gray-900">{booking.listingId.serviceProvider}</div>
                      <div className="text-sm uppercase font-medium text-gray-500">{booking.listingId.serviceName}</div>
                      <p className="text-sm text-gray-600 mt-1">
                        {`${parseTime(booking.timeslot)} • 1 hour session • $${booking.listingId.ratePerHr}`}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-stretch">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReschedule(true); // state trigger for reschedule modal
                        }}
                      >
                        Reschedule
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-red-500"
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
  <h3 className="text-xl font-semibold text-gray-800 mb-3">Completed</h3>
  <div className="space-y-4">
    <div
      className="rounded-xl border border-gray-200 hover:border-blue-400 p-4 hover:bg-blue-50 hover:shadow-md cursor-pointer bg-white transition"
      onClick={() => {
        navigate("/dashboard");
      }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between transition rounded-lg gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full object-cover shadow-sm"
            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            alt="Provider"
          />
        </div>

        {/* Info */}
        <div className="flex-grow">
          <div className="font-semibold text-base text-gray-900">John Doe</div>
          <div className="text-sm uppercase font-medium text-gray-500">Physics Review</div>
          <p className="text-sm text-gray-600 mt-1">
            Friday, May 17 • 2 hours • $30 total
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-stretch">
          <button
            className="btn btn-sm btn-ghost"
            onClick={(e) => {
              e.stopPropagation();
              // add rebook logic
            }}
          >
            Rebook
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
