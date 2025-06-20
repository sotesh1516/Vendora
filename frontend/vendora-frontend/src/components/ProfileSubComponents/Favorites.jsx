import React from 'react';

function Favorites() {
  const dummyFavorite = {
    _id: "123456",
    serviceName: "Event Photography",
    serviceProvider: "Amina Yusuf",
    description: "Professional event photography for campus events, parties, and more. High-quality DSLR, edits included.",
    ratePerHr: "$40",
    rating: 4.9,
    reviewers: 28,
    avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Your Favorites</h1>

      <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        <img
          src={dummyFavorite.avatar}
          alt="Service Provider"
          className="w-16 h-16 rounded-full object-cover shadow"
        />

        {/* Text Info */}
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-800">{dummyFavorite.serviceName}</h2>
          <p className="text-xs text-gray-500 mb-1">By {dummyFavorite.serviceProvider}</p>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {dummyFavorite.description}
          </p>
          <div className="text-xs text-gray-700">
            {dummyFavorite.ratePerHr} / hr · ⭐ {dummyFavorite.rating} ({dummyFavorite.reviewers})
          </div>
        </div>

        {/* Button */}
        <div className="flex-shrink-0 mt-4 sm:mt-0">
          <button className="btn btn-sm btn-primary">View</button>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
