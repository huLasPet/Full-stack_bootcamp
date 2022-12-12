import React from "react";
import { Header } from "./Header.jsx";
import { ShowNotes } from "./ShowNotes.jsx";
import { Footer } from "./Footer.jsx";
import { Input } from "./Input.jsx";
import { useState } from "react";
import { AddNote } from "./AddNote.js";
import { DeleteNote } from "./DeleteNote.jsx";

function App() {
  function NoNotes() {
    return (
      <div className="App">
        <Header />
        <h3>No note created so far.</h3>
        <Input notes={notes} add={AddNote} setNotes={setNotes} />
        <Footer />
      </div>
    );
  }

  const [notes, setNotes] = useState([]);
  // (condition) ? (if true) : (if false)
  return notes.length !== 0 ? (
    <div className="App">
      <Header />
      <Input notes={notes} add={AddNote} setNotes={setNotes} />
      <ShowNotes notes={notes} delete={DeleteNote} setNotes={setNotes} />
      <Footer />
    </div>
  ) : (
    NoNotes()
  );
}

export default App;
