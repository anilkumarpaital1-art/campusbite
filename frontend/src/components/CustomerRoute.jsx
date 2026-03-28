// src/components/CustomerRoute.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function CustomerRoute({ children }) {
  const { mode } = useContext(AppContext);

  // ❌ If vendor → block checkout
  if (mode === "vendor") {
    return <Navigate to="/vendor-dashboard" replace />;
  }

  return children;
}