import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { App } from "./components/App.jsx";

//Put all logic in the file call App and import it to this one

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
