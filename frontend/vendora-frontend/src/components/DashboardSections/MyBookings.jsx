import React from 'react'

function MyBookings() {
  return (
    <div>
      <div>
      <div className="space-y-6">
  {/* Example: Upcoming Bookings */}
  <div>
    <h2 className="text-lg font-bold mb-2">Upcoming</h2>

    <div className="rounded-lg border p-4 flex flex-col gap-4">
      {/* Booking card */}
      <div className="flex items-start justify-between hover:bg-gray-50 transition rounded-lg p-3">
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
          <div className="font-semibold text-sm">Amina Yusuf</div>
          <div className="text-xs uppercase font-semibold text-gray-500">Math Tutoring</div>
          <p className="text-xs text-gray-600 mt-1">
            Monday, May 27 at 3:00 PM • 1 hour session • $15/hr
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-stretch">
          <button className="btn btn-sm btn-outline">Reschedule</button>
          <button className="btn btn-sm btn-ghost text-red-500">Cancel</button>
        </div>
      </div>

      {/* Repeat this block for each booking */}
    </div>
  </div>

  {/* Example: Completed Bookings */}
  <div>
    <h2 className="text-lg font-bold mb-2">Completed</h2>

    <div className="rounded-lg border p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between hover:bg-gray-50 transition rounded-lg p-3">
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
