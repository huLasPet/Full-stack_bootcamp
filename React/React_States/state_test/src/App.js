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
  let [fullName, setFullName] = useState({
    fName: "",
    lName: "",
  });

  function updatefullName(event) {
    if (event.target.name === "fName") {
      setFullName((fullName) => ({
        fName: event.target.value,
        lName: fullName.lName,
      }));
    } else {
      setFullName((fullName) => ({
        lName: event.target.value,
        fName: fullName.fName,
      }));
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
            Hello {fullName.fName} {fullName.lName}
          </h1>
          <form>
            <input onChange={updatefullName} name="fName" placeholder="First Name" value={fullName.fName} />
            <input onChange={updatefullName} name="lName" placeholder="Last Name" value={fullName.lName} />
            <button>Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
