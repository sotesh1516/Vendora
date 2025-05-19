import React from "react"

export default function SignUp() {
    return (
        <>
        <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center w-full max-w-lg">
        <div className="mb-6">
          <div className="w-24 h-24 bg-indigo-600 text-white    rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
            VENDORA
          </div>
        </div>
        <form className="bg-white p-6 sm:p-10 rounded shadow-md w-full max-w-2xl">
            <div className="flex flex-col gap-4">
            <label htmlFor="name" className="fieldset-legend">What is your full name?</label>
        <input type="text" id="name" placeholder="Type here" className="input w-full" />
        <label htmlFor="usern" className="fieldset-legend">Pick a username you like</label>
        <input type="text" id="usern" placeholder="Type here" className="input w-full" />
        <label htmlFor="email" className="fieldset-legend">Where can we reach you?</label>
        <input type="email" id="email" placeholder="you@vt.edu" className="input w-full" />
        <label htmlFor="password" className="fieldset-legend">Create a secure password</label>
        <input type="password" id="password" placeholder="********" className="input w-full" />
            </div>
        
            <div className="flex flex-col justify-end items-center mt-8 gap-2">
                <button className="btn w-full">Sign Up</button>
                <a className="link link-primary self-end">Already have an account?</a>
            </div>
        </form>
        </div>
       </div>
        </>
    )
}