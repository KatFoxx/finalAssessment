import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
  const [cookies] = useCookies(["user"]);

  // If the user cookie exists, allow access; otherwise, redirect to login
  return cookies.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
