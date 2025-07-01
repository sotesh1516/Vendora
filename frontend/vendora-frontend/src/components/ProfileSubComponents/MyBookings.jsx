import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchUserBookings } from '../../api/user';


function MyBookings() {
  const navigate = useNavigate();

  const [reschedule, setReschedule] = useState();

  const handleClick = () => {

  };

  const signedInUser = useContext(UserContext);

  //this is to get access to the signed in user from useContext
  // const localCopyOfSignedInUser = signedInUser.user;
  //const setLocalCopyOfSignedUser = signedInUser.setUser;
  const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  //this is to expand the scope of fetched user in the useEffect and keep a copy of myBooking array
  const [fetchedUserBookings, setFetchedUserBookings] = useState([]);

  const userInfo = {
    userId: localCopyOfSignedInUser.id,
  };

  useEffect(() => {
    const fetchUser = async (info) => {
      const response = await fetchUserBookings(info);

      if (response && response.user)
      {
        setFetchedUserBookings(response.user.myBookings);
      }

      return {};
    };

    fetchUser(userInfo);
    
  }, []);

  const parseTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })

  };


  return (
    <div>
      <div>
      <div className="space-y-6">
  {/* Example: Upcoming Bookings */}
  <div>
    <h2 className="text-lg font-bold mb-2">Upcoming</h2>
    {fetchedUserBookings.map((booking, index)=> (
      <div key={index} className="rounded-xl border border-gray-200 p-4 hover:bg-blue-50 hover:shadow-md cursor-pointer bg-white transition" onClick={() => {
        navigate("/dashboard");
      }
      }>
        {/* Booking card */}
        <div className="flex items-start justify-between transition rounded-lg p-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="https://img.daisyui.com/images/profile/demo/5@94.webp"
              alt="Provider"
            />
          </div>
  
          {/* Info */}
          <div className="flex-grow px-4">
            <div className="font-semibold text-sm">{booking.listingId.serviceProvider}</div>
            <div className="text-xs uppercase font-semibold text-gray-500">{booking.listingId.serviceName}</div>
            <p className="text-xs text-gray-600 mt-1">
             {`${parseTime(booking.timeslot)} • 1 hour session • $${booking.listingId.ratePerHr}`}
            </p>
          </div>
  
          {/* Actions */}
          <div className="flex items-center gap-2 self-stretch">
            <button className="btn btn-sm btn-outline">Reschedule</button>
            <button className="btn btn-sm btn-ghost text-red-500">Cancel</button>
          </div>
        </div>
  
        {/* Repeat this bldow for each booking */}
      </div>
    ))}
    
  </div>

  {/* Example: Completed Bookings */}
  <div>
    <h2 className="text-lg font-bold mb-2">Completed</h2>

    <div className="rounded-xl border border-gray-200 p-4 hover:bg-blue-50 hover:shadow-md cursor-pointer bg-white transition">
      <div className="flex items-start justify-between transition rounded-lg p-3">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            alt="Provider"
          />
        </div>

        <div className="flex-grow px-4">
          <div className="font-semibold text-sm">John Doe</div>
          <div className="text-xs uppercase font-semibold text-gray-500">Physics Review</div>
          <p className="text-xs text-gray-600 mt-1">
            Friday, May 17 • 2 hours • $30 total
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch">
          <button className="btn btn-sm btn-ghost">Rebook</button>
        </div>
      </div>
    </div>

    
  </div>
</div>

      </div>
    </div>
  )
}

export default MyBookings
