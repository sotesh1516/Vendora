import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext"; 
import React from "react";

export default function ProtectedRoute() {
  const { accessToken } = useAuth();

  // if no token, redirect to login
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  // otherwise render the child routes
  return <Outlet />;
}
