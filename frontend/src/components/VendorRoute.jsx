import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

export default function VendorRoute({ children }) {

const { mode } = useContext(AppContext);

if(mode !== "vendor"){
return <Navigate to="/" />;
}

return children;
}