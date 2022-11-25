import React from "react";
import { Heading } from "./Heading";

//Create the Heading in another file with the name prop(erty) passed in, import it and use it in this one

function App() {
  return (
    <div>
      <h1>Display a heading message from a function in a specific color based on the time of day</h1>
      {/* Call the Heading function like this with name passed as a prop */}
      <Heading name="Random name" />
    </div>
  );
}

export { App };
