import React, { useEffect, useState } from 'react';
import { fetchUserFavorites } from '../../api/user';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const dummyFavorite = {
    _id: "123456",
    serviceName: "Event Photography",
    serviceProvider: "Amina Yusuf",
    description: "Professional event photography for campus events, parties, and more. High-quality DSLR, edits included.",
    ratePerHr: "40",
    rating: 4.9,
    reviewers: 28,
    avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  };

  const [fetchedUserFavorites, setFetchedUserFavorites] = useState([]);

  const navigate = useNavigate();

  const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  useEffect(() => {
    const fetchUserMyFavorite = async () => {
      try {
        const serverResponse = await fetchUserFavorites(localCopyOfSignedInUser.id);

        if (serverResponse && serverResponse.user)
        {
          console.log(serverResponse.user.myFavorites);
          setFetchedUserFavorites(serverResponse.user.myFavorites);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserMyFavorite();
  }, []);

  const handleClick = (listingId) => {
    navigate(`/listing/${listingId}`);
  };

  const handleRemove = () => {

  }

  return (
    <div className="p-4 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          My <span className="text-blue-600">Favorites</span>
        </h2>
      </div>

      <div className="space-y-4">
        {/* Favorite card styled like MyBookings */}
        {fetchedUserFavorites.map((favorite) => (
          <div onClick={() => {
            handleClick(favorite._id);
          }}
          className="rounded-xl border border-gray-200 hover:border-blue-400 p-4 hover:bg-blue-50 hover:shadow-md cursor-pointer bg-white transition"
          key={favorite._id}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between transition rounded-lg gap-4">
            {/* Avatar (same size as bookings) */}
            <div className="flex-shrink-0">
              <img
                className="w-12 h-12 rounded-full object-cover shadow-sm"
                src={dummyFavorite.avatar}
                alt={favorite.serviceProvider}
              />
            </div>

            {/* Info section */}
            <div className="flex-grow">
              <div className="font-semibold text-base text-gray-900">{favorite.serviceProvider}</div>
              <div className="text-sm uppercase font-medium text-gray-500">{favorite.serviceName}</div>
              <p className="text-sm text-gray-600 mt-1">
                {favorite.description}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                $ {favorite.ratePerHr}/hr · ⭐ {dummyFavorite.rating} ({dummyFavorite.reviewers})
              </p>
            </div>


            {/* Actions (same height alignment as MyBookings) */}
            <div className="flex items-center gap-2 self-stretch">
              <button
                className="btn btn-sm btn-outline btn-error text-red-600 border-red-300 hover:bg-red-500 hover:text-white"
                onClick={() => {
                
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>


  );
}

export default Favorites;
