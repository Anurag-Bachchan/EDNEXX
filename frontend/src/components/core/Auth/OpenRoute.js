// OpenRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Assuming you're using react-router-dom

const OpenRoute = ({ children }) => {
  const isAuthenticated = false; // Replace this with your actual authentication logic

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />; // Redirect to a different route if authenticated
  }

  return children; // Render children if not authenticated
};

export default OpenRoute;
