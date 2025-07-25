import React, { useContext, useState } from "react";
import { signInUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext"; // defined using createContext in UserContext.js

export default function SignIn() {
  const navigate = useNavigate();
  const { user: userFromContext, setUser: setUserfromContext } = useContext(UserContext);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    all: false
  });

  const [message, setMessage] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

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
    } else if (!isValidEmail(user.email)) {
      newErrors.email = "Incorrect email format";
      valid = false;
    } else if (user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from reloading the page

    if (!validateForm()) {
      console.log("Form validation failed!");
      return;
    }

    try {
      const response = await signInUser(user);

      if (response && response.user) {
        // added the signed in user to the context so that it can be accessed from anywhere in the application
        // also we are experimenting with localStorage to save state unconditionally
        // we use JSON.stringify for visibility
        window.localStorage.setItem("logged_in_user", JSON.stringify(response.user));
        setUserfromContext(response.user);
        console.log(response.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign in", error);
      setMessage("Error signing in. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="flex flex-col items-center w-full max-w-lg">
          {/* Vendora temporary logo */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
              VENDORA
            </div>
          </div>

          {/* Sign in card */}
          <form
            className="bg-white p-8 sm:p-10 rounded-xl shadow-md w-full border border-gray-100"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Sign In
            </h1>

            {errors.all && <p className="text-red-500 text-sm mb-4">All fields are required</p>}
            {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

            {/* Inputs */}
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jordan@vt.edu"
                  className="input input-bordered w-full"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="input input-bordered w-full"
                  value={user.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col justify-end items-center mt-8 gap-3">
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full"
              >
                Sign In
              </button>
              <a
                className="text-sm text-indigo-600 hover:underline cursor-pointer self-end"
                onClick={() => navigate("/signup")}
              >
                Don&apos;t have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
