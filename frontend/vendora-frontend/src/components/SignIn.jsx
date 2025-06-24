import React, { useContext, useState, userContext } from "react";
import { signInUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";  //defined using createContext in UserContext.js

export default function SignIn() {
    const navigate = useNavigate();
    //this could be a problem
    const {user: userFromContext, setUser: setUserfromContext} = useContext(UserContext);

    const [user, setUser] = useState({
      email: "",
      password: ""
    })

    const [errors, setErrors] = useState({
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
        email: "",
        password: "",
        all: false
      };

      let valid = true;

      if (!user.email || !user.password) {
        newErrors.all = true;
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
      const response = await signInUser(user);

      if (response && response.user) {
        //added the signed in user to the context so that it can be accessed from anywhere in the application
        //also we are experimenting with localStorage to save state unconditionally
        //we use JSON.stringify for visibility
        window.localStorage.setItem("logged_in_user", JSON.stringify(response.user));
        setUserfromContext(response.user);
        console.log(response.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign in", error);
      setMessage("Error signing in. PLease try again.");
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
        <label htmlFor="email" className="fieldset-legend">Email:</label>
        <input type="email" id="email" placeholder="jordan@vt.edu" className="input w-full" value={user.email} onChange={handleChange}/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <label htmlFor="password" className="fieldset-legend">Password</label>
        <input type="password" id="password" placeholder="********" className="input w-full" value={user.password} onChange={handleChange}/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
        
            <div className="flex flex-col justify-end items-center mt-8 gap-2">
                <button className="btn w-full" onClick={handleSubmit}>Sign In</button>
                <a className="link link-primary self-end">Don't have an account?</a>
            </div>
        </form>
        </div>
       </div>
        </>
    )
}