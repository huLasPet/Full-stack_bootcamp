import React from "react";
import { Header } from "./Header.jsx";
import { Note } from "./Note.jsx";
import { Footer } from "./Footer.jsx";
import { notes } from "./Notes.js";
import { Input } from "./Input.jsx";

function showNotes() {
  return (
    <div className="App">
      <Header />

      {/* 
Map is the same as forEach but returns a new array - would be better here but this is practice.
Need to add the key as well even if not displayed otherwise it will throw errors 
      */}
      {notes.map((props) => {
        return <Note key={props.key} title={props.title} text={props.text} />;
      })}

      <Footer />
    </div>
  );
}

function NoNotes() {
  return (
    <div className="App">
      <Header />
      <h3>No note created so far.</h3>
      <Footer />
    </div>
  );
}

function App() {
  // (condition) ? (if true) : (if false)
  return notes.length !== 0 ? showNotes() : NoNotes();
}

export default App;
