import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function FormatH1() {
  let time = new Date();
  let currentHour = time.getHours();
  if (currentHour < 12) {
    greeting = "Morning";
  } else if (currentHour < 12 || currentHour < 18) {
    greeting = "Afternoon";
    inlineStyle.color = "green";
  } else {
    greeting = "Evening";
    inlineStyle.color = "blue";
  }
}

function Heading() {
  return (
    <h1 className="heading" style={inlineStyle}>
      {greeting}
    </h1>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
let greeting;
let inlineStyle = { color: "red" };

FormatH1();
root.render(
  <div>
    <h1>Display a message from a function in a specific color based on the time of day</h1>
    <Heading></Heading>
  </div>
);
