import React, { useState } from 'react';
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
    <div 
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden h-96 flex flex-col cursor-pointer"
      onClick={() => {
        console.log(listing);
        navigate(`/listing/${listing._id}`, { state: { listing } });
      }}
    >
      {/* Header with favorite button */}
      <div className="relative p-6 pb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200 z-10"
          title="Toggle Favorite"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#ef4444' : 'none'}
            stroke={isFavorite ? '#ef4444' : '#6b7280'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.5-1.5 3-3.25 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5C2 10.75 3.5 12.5 5 14l7 7z" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src="https://img.daisyui.com/images/profile/demo/5@94.webp"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50 shadow-md"
              alt="Service Avatar"
            />
            {/* <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div> */}
          </div>
        </div>

        {/* Title & Provider */}
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1 line-clamp-1">
            {listing.serviceName}
          </h3>
          <p className="text-sm text-gray-600 font-medium">{listing.serviceProvider}</p>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-blue-600">${listing.ratePerHr}</span>
            <span className="text-sm text-gray-500">/hr</span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(listing.rating) ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              {listing.rating} ({listing.reviewers})
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 flex-1 pb-6">
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {listing.description}
        </p>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/5 group-hover:to-transparent transition-all duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
}

export default ListingCard;