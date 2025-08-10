import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateUserFavorites } from '../../api/user';

function ListingCard({ listing }) {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(listing.isFavorite);

  const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  const handleClick = async () => {
    // intentionally done to avoid latency
    setIsFavorite(!isFavorite);
    console.log(isFavorite);

    const updateInfo = {
      userId: localCopyOfSignedInUser.id,
      listingId: listing._id,
    };

    const userFavoriteResponse = await updateUserFavorites(updateInfo);

    if (userFavoriteResponse && userFavoriteResponse.updatedUser) {
      console.log("listing has been marked favorite");
    }
  };

  return (
    <div>
      <div className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition w-full h-80 flex flex-col">
  {/* Avatar */}
  <img
    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
    className="mx-auto w-16 h-16 rounded-full mb-4 object-cover ring-1 ring-gray-100"
    alt="Service Avatar"
  />

  {/* Title */}
  <h3 className="font-semibold text-base text-gray-900 group-hover:text-blue-600 transition">
    {listing.serviceName}
  </h3>

  {/* Provider */}
  <p className="text-sm text-gray-500 mt-1">{listing.serviceProvider}</p>

  {/* Stats */}
  <div className="mt-3 text-sm text-gray-700 font-medium">
    <span className="text-gray-800">${listing.ratePerHr}/hr</span>
    <span className="text-gray-400 mx-1">·</span>
    <span>⭐ {listing.rating} ({listing.reviewers})</span>
  </div>

  {/* Description */}
  <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-snug">
    {listing.description}
  </p>

  {/* Push buttons to bottom */}
  <div className="mt-auto flex justify-center gap-2">
    <button
      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
      onClick={() => {
        console.log(listing);
        navigate(`/listing/${listing._id}`, { state: { listing } });
      }}
    >
      View
    </button>

    <button
      onClick={handleClick}
      className="btn btn-sm btn-ghost hover:bg-gray-100 rounded-lg"
      title="Toggle Favorite"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? '#ef4444' : 'none'}
        stroke={isFavorite ? '#ef4444' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.5-1.5 3-3.25 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5C2 10.75 3.5 12.5 5 14l7 7z" />
      </svg>
    </button>
  </div>
</div>

    </div>
  );
}

export default ListingCard;
