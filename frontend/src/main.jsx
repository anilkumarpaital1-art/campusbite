import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import "./styles/main.css"
import "./styles/animations.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

<BrowserRouter>
<AppProvider>
<App/>
</AppProvider>
</BrowserRouter>

);