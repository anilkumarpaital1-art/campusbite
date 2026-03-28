import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(){

const { pathname } = useLocation();

useEffect(()=>{

/* PREVENT BROWSER AUTO RESTORE */

if ("scrollRestoration" in window.history) {
window.history.scrollRestoration = "manual";
}

/* SCROLL TO TOP */

window.scrollTo({
top: 0,
left: 0,
behavior: "instant"
});

},[pathname]);

return null;

}