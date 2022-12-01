import React from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  let [stateTime, setState] = React.useState(new Date().toLocaleTimeString());
  //This is for the manual update with the button
  function setTime() {
    let currentTime = new Date();
    setState(currentTime.toLocaleTimeString());
  }

  //This is to update every second using the effect hook
  React.useEffect(() => {
    const interval = setInterval(() => {
      let currentTime = new Date();
      setState(currentTime.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
