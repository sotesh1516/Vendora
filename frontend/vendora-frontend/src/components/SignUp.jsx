import React, { useState } from "react";
import { signUpUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    all: false,
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
      name: "",
      username: "",
      email: "",
      password: "",
      all: false,
    };

    let valid = true;

    if (!user.name || !user.username || !user.email || !user.password) {
      newErrors.all = true;
      valid = false;
    } else if (user.name.length < 2) {
      newErrors.name = "Name must be atleast two characters long";
      valid = false;
    } else if (!isValidEmail(user.email)) {
      newErrors.email = "Incorrect email format";
      valid = false;
    } else if (user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    } else if (user.username.length < 4) {
      newErrors.username = "Username is too short";
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
      const response = await signUpUser(user);

      if (response && response.user) {
        //possibly set message
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign up", error);
      setMessage("Error signing up. PLease try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="flex flex-col items-center w-full max-w-lg">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
              VENDORA
            </div>
          </div>

          {/* Form Container */}
          <form
            className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Create Your Account
            </h1>
            <p className="text-sm text-gray-500 text-center mb-4">
              Fill out the details below to get started.
            </p>

            {errors.all && (
              <p className="text-red-500 text-sm mb-2">
                All fields are required
              </p>
            )}

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  What is your full name?
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Jordan Ellis"
                  className="input input-bordered w-full mt-1"
                  value={user.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Pick a username you like
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="jordan.ellis23"
                  className="input input-bordered w-full mt-1"
                  value={user.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Where can we reach you?
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jordan@vt.edu"
                  className="input input-bordered w-full mt-1"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Create a secure password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="input input-bordered w-full mt-1"
                  value={user.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col justify-end items-center mt-6 gap-3">
              <button
                className="btn btn-primary w-full text-white"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
              <a
                className="link link-primary text-sm"
                onClick={() => navigate("/signin")}
              >
                Already have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
