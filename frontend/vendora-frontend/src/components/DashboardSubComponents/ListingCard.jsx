import React from 'react'

function ListingCard(props) {
  return (
    <div>
      <div className="bg-white rounded-xl p-5 text-center shadow hover:shadow-md transition w-full max-w-xs">
        <img
          src="https://img.daisyui.com/images/profile/demo/5@94.webp"
          className="mx-auto w-16 h-16 rounded-full mb-3 object-cover"
          alt="Service Avatar"
        />

        <h3 className="font-semibold text-md">{props.name}</h3>
        <p className="text-xs text-gray-500">{props.service}</p>

        <div className="mt-2 text-sm text-gray-600">
          <span>{props.rate}/hr</span> · <span>⭐ {props.rating} ({props.reviewers})</span>
        </div>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {props.description}
        </p>

        <div className="mt-4 flex justify-center gap-2">
          <button className="btn btn-xs btn-outline">View</button>
          <button className="btn btn-xs btn-ghost">❤️</button>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
