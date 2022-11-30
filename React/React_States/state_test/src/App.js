import React from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  //Display the current time, update automatically every second or can click to update as well
  //Start with empty stateTime in useState but after 1 second the setTime() is triggered to give it a value
  let [stateTime, setState] = React.useState();
  function setTime() {
    let currentTime = new Date();
    setState(currentTime.toLocaleTimeString());
    //Use clearInterval() to ensure there is only 1 setInterval is running - stop a memory leak
    clearInterval();
  }
  setInterval(setTime, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{stateTime}</h1>
        <button onClick={setTime}>Get time</button>
      </header>
    </div>
  );
}

export default App;
