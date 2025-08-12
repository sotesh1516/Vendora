import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");


  const handleChange = async (event) => {
    //this handles input change that happens inside the search box
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    props.sendToParent(searchQuery);// this sends the query info to the dashboard component so it can be used for fetching the necessary listings
    console.log(searchQuery);
  };


  return (
    <div className="navbar bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      {/* Left Section */}
      <div className="flex items-center gap-3 flex-1">
        <Link
          to="/dashboard"
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Vendora
        </Link>

        {/* Search */}
        <div className="md:flex items-center gap-2 ml-4">
          <input
            type="text"
            placeholder="Search services..."
            className="input input-bordered input-sm w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
            value={searchQuery}
          />
          <button onClick={handleSearch} className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-gray-100"
          >
            <div className="w-10 rounded-full overflow-hidden">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 w-52 p-2 shadow-lg rounded-lg bg-white border border-gray-100 z-[100]"
          >
            <li>
              <Link to="/profile" className="hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:bg-gray-100">
                Settings
              </Link>
            </li>
            <li>
              <button className="text-red-600 hover:bg-red-50 w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
