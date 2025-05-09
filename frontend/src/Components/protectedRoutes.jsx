// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsedContext } from "./App";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(UsedContext);

  return state ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
