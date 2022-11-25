import React from "react";
import { Heading } from "./Heading";
import { Add, Subtract } from "./Calculator.js";

//Create the Heading in another file with the name prop(erty) passed in, import it and use it in this one

function App() {
  return (
    <div>
      <h1>Display a heading message from a function in a specific color based on the time of day</h1>
      {/* Call the Heading function like this with name passed as a prop */}
      <Heading name="Random name" />
      <h1>Also practicing importing multiple functions from 1 file:</h1>
      <Add number1={1} number2={2} />
      <h1>Another one:</h1>
      <Subtract number1={15} number2={2} />
    </div>
  );
}

export { App };
