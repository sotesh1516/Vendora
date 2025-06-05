<div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-white hover:bg-gray-50 transition">

  {/* Left: Thumbnail Image */}
  <div className="flex-shrink-0 w-full md:w-48 h-36 overflow-hidden rounded-md">
    <img
      src="https://img.daisyui.com/images/profile/demo/5@94.webp"
      alt="Service Preview"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right: Details */}
  <div className="flex-1 flex flex-col justify-between">
    
    {/* Provider Info */}
    <div className="mb-2">
      <h3 className="text-lg font-semibold">Amina Yusuf</h3>
      <p className="text-sm text-gray-500">Virginia Tech Campus · ⭐ 4.8 (32 reviews)</p>
    </div>

    {/* Services Offered */}
    <div className="space-y-1 text-sm">
      <div className="flex justify-between items-center">
        <p className="text-gray-700">Essay Editing</p>
        <div className="text-right text-sm">
          <p className="text-gray-700 font-semibold">$20.00</p>
          <p className="text-xs text-gray-400">45 min</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-700">One-on-One Tutoring</p>
        <div className="text-right text-sm">
          <p className="text-gray-700 font-semibold">$25.00</p>
          <p className="text-xs text-gray-400">1 hr</p>
        </div>
      </div>
    </div>

    {/* Book Button */}
    <div className="mt-3">
      <button className="btn btn-sm btn-primary w-full md:w-fit">Book</button>
    </div>
  </div>
</div>








<div className="bg-white rounded-xl p-5 text-center shadow hover:shadow-md transition w-full max-w-xs">
  <img
    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
    className="mx-auto w-16 h-16 rounded-full mb-3 object-cover"
    alt="Service Avatar"
  />

  <h3 className="font-semibold text-md">Amina Yusuf</h3>
  <p className="text-xs text-gray-500">Math Tutoring</p>

  <div className="mt-2 text-sm text-gray-600">
    <span>$15/hr</span> · <span>⭐ 4.8 (32)</span>
  </div>

  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
    Covers calculus, stats, and linear algebra. Great for undergrads or test prep.
  </p>

  <div className="mt-4 flex justify-center gap-2">
    <button className="btn btn-xs btn-outline">View</button>
    <button className="btn btn-xs btn-ghost">❤️</button>
  </div>
</div>