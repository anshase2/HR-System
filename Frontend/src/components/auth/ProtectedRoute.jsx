import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function ProtectedRoute({ children, roles = [] }) {
  const {
    isAuthenticated,
    authUser,
    isInitializing,
  } = useAuth();

  const location = useLocation();

  // Wait until authentication state is restored
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Check roles
  if (roles.length > 0) {
    const userRole = authUser?.role;

    if (!userRole || !roles.includes(userRole)) {
      return <Navigate to="/home" replace />;
    }
  }

  return children;
}