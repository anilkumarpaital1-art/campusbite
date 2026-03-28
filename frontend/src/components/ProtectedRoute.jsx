import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {

const { user } = useContext(AppContext);

/* CHECK LOCAL STORAGE */

const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

/* NOT LOGGED IN */

if (!user && !token && !storedUser) {
return <Navigate to="/login" replace />;
}

/* ALLOWED */

return children;

}