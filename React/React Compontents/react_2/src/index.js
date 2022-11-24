import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { Heading } from "./heading.jsx";

//Create the Heading in another file with the name prop(erty) passed in, import it and use it in this one

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Display a heading message from a function in a specific color based on the time of day</h1>
    {/* Call the Heading function like this */}
    <Heading name="Random name" />
  </div>
);
