import React, { useContext, useState } from "react";
import { signInUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext"; // defined using createContext in UserContext.js
import { useAuth } from "./contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

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
  const [showPassword, setShowPassword] = useState(false);

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

      if (response && response.accessToken) {
        // added the signed in user to the context so that it can be accessed from anywhere in the application
        // also we are experimenting with localStorage to save state unconditionally
        // we use JSON.stringify for visibility
        window.localStorage.setItem("logged_in_user", JSON.stringify(response.user));
        //console.log("access token added by signin", response.accessToken)
        setAccessToken(response.accessToken);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Vendora temporary logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl mb-4 shadow-lg">
              <span className="text-xl font-bold">V</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">VENDORA</span>
            </h1>
            <p className="text-gray-600 mt-2">Welcome back! Please sign in to continue.</p>
          </div>

          {/* Sign in card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="space-y-6" onSubmit={handleSubmit}>
              {errors.all && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  All fields are required
                </div>
              )}
              {message && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {message}
                </div>
              )}

              {/* Inputs */}
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      placeholder="jordan@vt.edu"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 hover:bg-white focus:bg-white"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="********"
                      className="w-full pl-12 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 hover:bg-white focus:bg-white"
                      value={user.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col justify-end items-center mt-8 gap-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  <span>Sign In</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <a
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer self-end"
                  onClick={() => navigate("/signup")}
                >
                  Don&apos;t have an account? <span className="font-semibold text-blue-600 hover:text-blue-700">Sign up</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>© 2024 Vendora. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}