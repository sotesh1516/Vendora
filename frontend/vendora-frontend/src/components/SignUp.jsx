import React, { useState } from "react"

export default function SignUp() {
    const [user, setUser] = useState({
      name: "",
      username: "",
      email: "",
      password: ""
    })

    const [message, setMessage] = useState("");

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);

    }

    const handleChange = (event) => {
      const {id, value} = event.target
      setUser({...user, [id]:value})
    }

    const handleSubmit = async () => {
        if (!user.name || !user.username || !user.email || !user.password) {
          setMessage("All fields are required!");
          return;
        }

        if (!isValidEmail(user.email)) {
          setMessage("Incorrect email format!");
          return;
        }

        if (user.password.length < 8) {
          setMessage("Password must be at least 8 characters long!");
          return;
        }

        if (user.username.length < 4) {
          setMessage("Username is too short!");
          return;
        }

    //handle submission

        


    }



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
        <input type="text" id="name" placeholder="Jordan Ellis" className="input w-full" value={user.name} onChange={handleChange}/>
        <label htmlFor="usern" className="fieldset-legend">Pick a username you like</label>
        <input type="text" id="usern" placeholder="jordan.ellis23" className="input w-full" value={user.username} onChange={handleChange}/>
        <label htmlFor="email" className="fieldset-legend">Where can we reach you?</label>
        <input type="email" id="email" placeholder="jordan@vt.edu" className="input w-full" value={user.email} onChange={handleChange}/>
        <label htmlFor="password" className="fieldset-legend">Create a secure password</label>
        <input type="password" id="password" placeholder="********" className="input w-full" value={user.password} onChange={handleChange}/>
            </div>
        
            <div className="flex flex-col justify-end items-center mt-8 gap-2">
                <button className="btn w-full" onClick={handleSubmit}>Sign Up</button>
                <a className="link link-primary self-end">Already have an account?</a>
            </div>
        </form>
        </div>
       </div>
        </>
    )
}