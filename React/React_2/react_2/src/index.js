import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
let time = new Date();
let currentHour = time.getHours();
let greeting;
let inlineStyle = { color: "red" };

if (currentHour < 12) {
  greeting = "Morning";
} else if (currentHour < 12 || currentHour < 18) {
  greeting = "Afternoon";
  inlineStyle.color = "green";
} else {
  greeting = "Evening";
  inlineStyle.color = "blue";
}

root.render(
  <div>
    <h1>Display a message in a specific color based on the time of day</h1>
    <h1 className="heading" style={inlineStyle}>
      {greeting}
    </h1>
  </div>
);
