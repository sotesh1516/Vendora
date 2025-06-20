import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <>
            <div className="navbar bg-blue-500 shadow-sm p-4">
  <div className="flex-1">
  <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
    </button>
    <Link to="/dashboard" className="btn btn-ghost text-xl">Vendora</Link>
    <input type="text" placeholder="Search" className="input input-bordered w-64 md:w-80" />
    <button className="btn">Search</button>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-m dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link>Settings</Link></li>
        <li><Link>Logout</Link></li>
      </ul>
    </div>
  </div>
</div>
        </>
    )
}