import React from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  let [stateCount, setState] = React.useState(0);
  function increase() {
    setState(stateCount + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{stateCount}</h1>
        <button onClick={increase}>+</button>
      </header>
    </div>
  );
}

export default App;
