import React, { useState } from "react";
import { signUpUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
      name: "",
      username: "",
      email: "",
      password: ""
    })

    const [errors, setErrors] = useState({
      name: "",
      username: "",
      email: "",
      password: "",
      all: false
    });

    const [message, setMessage] = useState("");

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);

    }

    const handleChange = (event) => {
      const {id, value} = event.target
      setUser({...user, [id]:value})
    }

    const validateForm = () => {
      let newErrors = {
        name: "",
        username: "",
        email: "",
        password: "",
        all: false
      };

      let valid = true;

      if (!user.name || !user.username || !user.email || !user.password) {
        newErrors.all = true;
        valid = false;
      }

      else if (user.name.length < 2) {
        newErrors.name = "Name must be atleast two characters long";
        valid = false;
      }

      else if (!isValidEmail(user.email)) {
        newErrors.email = "Incorrect email format";
        valid = false;
      }

      else if (user.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
        valid = false;
      }

      else if (user.username.length < 4) {
        newErrors.username = "Username is too short";
        valid = false;
      }

      setErrors(newErrors);
      return valid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent the form from reloading the page

        if (!validateForm()) {
          console.log("Form validation failed!");
          return;
        }
        
    try {
      const response = await signUpUser(user);

      if (response && response.user) {
        //possibly set message
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign up", error);
      setMessage("Error signing up. PLease try again.");
    };
    }



    return (
        <>
        <div className="flex items-center justify-center min-h-screen pt-25">
        <div className="flex flex-col items-center w-full max-w-lg">
        <div className="mb-6">
          <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
            VENDORA
          </div>
        </div>
        <form className="bg-white p-6 sm:p-10 rounded shadow-md w-full max-w-sm">
        {errors.all && <p className="text-red-500 text-sm">All fields are required</p>}
            <div className="flex flex-col gap-4">
            <label htmlFor="name" className="fieldset-legend">What is your full name?</label>
        <input type="text" id="name" placeholder="Jordan Ellis" className="input w-full" value={user.name} onChange={handleChange}/>
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <label htmlFor="username" className="fieldset-legend">Pick a username you like</label>
        <input type="text" id="username" placeholder="jordan.ellis23" className="input w-full" value={user.username} onChange={handleChange}/>
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        <label htmlFor="email" className="fieldset-legend">Where can we reach you?</label>
        <input type="email" id="email" placeholder="jordan@vt.edu" className="input w-full" value={user.email} onChange={handleChange}/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <label htmlFor="password" className="fieldset-legend">Create a secure password</label>
        <input type="password" id="password" placeholder="********" className="input w-full" value={user.password} onChange={handleChange}/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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