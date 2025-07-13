import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateUserFavorites } from '../../api/user';

function ListingCard({ listing }) {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  const handleClick = async () => {
    const updateInfo = {
      userId: localCopyOfSignedInUser.id,
      listingId: listing._id,
    };

    const userFavoriteResponse = await updateUserFavorites(updateInfo);

    if (userFavoriteResponse && userFavoriteResponse.updatedUser)
    {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl p-5 text-center shadow hover:shadow-md transition w-full">
        <img
          src="https://img.daisyui.com/images/profile/demo/5@94.webp"
          className="mx-auto w-16 h-16 rounded-full mb-3 object-cover"
          alt="Service Avatar"
        />

        <h3 className="font-semibold text-md">{listing.serviceName}</h3>
        <p className="text-xs text-gray-500">{listing.serviceProvider}</p>

        <div className="mt-2 text-sm text-gray-600">
          <span>{listing.ratePerHr}/hr</span> · <span>⭐ {listing.rating} ({listing.reviewers})</span>
        </div>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {listing.description}
        </p>

        <div className="mt-4 flex justify-center gap-2">
          <button className="btn btn-xs btn-outline" onClick={() => {
            navigate(`/listing/${listing._id}`, {state: { listing }});
          }}>View</button>
          <button onClick={handleClick} className="btn btn-xs btn-ghost">
            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? 'gray' : 'none'}
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.5-1.5 3-3.25 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5C2 10.75 3.5 12.5 5 14l7 7z" />
            </svg></button>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
