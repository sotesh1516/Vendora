import React, { useEffect, useState } from 'react';
import { fetchUserFavorites } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

  //const localCopyOfSignedInUser = JSON.parse(localStorage.getItem("logged_in_user"));
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchUserMyFavorite = async () => {
      try {
        const serverResponse = await fetchUserFavorites({accessToken});

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Favorites</span>
              </h1>
              <p className="text-gray-600 mt-1">Your saved service listings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Saved Services</h2>
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {fetchedUserFavorites.length}
          </div>
        </div>

        <div className="grid gap-4">
          {/* Favorite card styled like MyBookings */}
          {fetchedUserFavorites.map((favorite) => (
            <div 
              onClick={() => {
                handleClick(favorite._id);
              }}
              className="
                group bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 
                hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer 
                p-6 overflow-hidden
              "
              key={favorite._id}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Avatar with gradient ring */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full p-0.5">
                      <img
                        className="w-14 h-14 rounded-full object-cover bg-white"
                        src={dummyFavorite.avatar}
                        alt={favorite.serviceProvider}
                      />
                    </div>
                    {/* Favorite heart indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Info section */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg text-gray-900 truncate">{favorite.serviceProvider}</div>
                    <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide truncate">{favorite.serviceName}</div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {favorite.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="font-semibold">${favorite.ratePerHr}/hr</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{dummyFavorite.rating}</span>
                        <span className="text-gray-400">({dummyFavorite.reviewers})</span>
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
                      handleClick(favorite._id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="
                      px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 
                      hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {fetchedUserFavorites.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">Start exploring services and save your favorites for quick access.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="
                px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl
                hover:shadow-lg transition-all duration-200 hover:scale-105
              "
            >
              Browse Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;