import React from "react";

function Heading(prop) {
  let greeting;
  let inlineStyle = { color: "red" };
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

  return (
    <h1 className="heading" style={inlineStyle}>
      {greeting} {prop.name}
    </h1>
  );
}

export { Heading };
