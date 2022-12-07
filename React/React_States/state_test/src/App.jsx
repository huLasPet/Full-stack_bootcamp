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
    email: "",
  });

  function UpdateFullName(event) {
    let { name, value } = event.target;
    if (name === "fName") {
      setFullName({
        fName: value,
        lName: fullName.lName,
        email: fullName.email,
      });
    } else if (name === "lName") {
      setFullName({
        fName: fullName.fName,
        lName: value,
        email: fullName.email,
      });
    } else {
      setFullName({
        fName: fullName.fName,
        lName: fullName.lName,
        email: value,
      });
    }
  }

  function TestForm(event) {
    console.log(event.target.fName.value);
    event.preventDefault();
  }

  //Does the same as updateFullName, just shorter
  //Display works without the ... as well, but creates a new object within the current object each time - nesting a new object after every change
  //With ... it only changes what is passed as "name" from the input
  function SpreadOperatorUpdate(event) {
    let { name, value } = event.target;
    setFullName({ ...fullName, [name]: value });
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
          <p>{fullName.email}</p>
          <form onSubmit={TestForm}>
            <input onChange={SpreadOperatorUpdate} name="fName" placeholder="First Name" value={fullName.fName} />
            <input onChange={SpreadOperatorUpdate} name="lName" placeholder="Last Name" value={fullName.lName} />
            <input onChange={SpreadOperatorUpdate} name="email" placeholder="E-mail" value={fullName.email} />
            <button>Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
