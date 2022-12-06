import React from "react";

import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

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

  //Display name typed into the form
  let [fName, setfName] = useState("");
  let [lName, setlName] = useState("");

  function updatefName(event) {
    if (event.nativeEvent.data === null) {
      setfName(fName.slice(0, -1));
    } else {
      setfName(fName + event.nativeEvent.data);
    }
  }

  function updatelName(event) {
    if (event.nativeEvent.data === null) {
      setlName(lName.slice(0, -1));
    } else {
      setlName(lName + event.nativeEvent.data);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{stateTime}</h1>
        <button onClick={setTime}>Get time</button>

        <h1>-----------</h1>

        <div className="container">
          <h1>
            Hello {fName} {lName}
          </h1>
          <form>
            <input onChange={updatefName} name="fName" placeholder="First Name" />
            <input onChange={updatelName} name="lName" placeholder="Last Name" />
            <button>Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
