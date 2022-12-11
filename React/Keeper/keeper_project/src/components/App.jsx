import React from "react";
import { Header } from "./Header.jsx";
import { ShowNotes } from "./ShowNotes.jsx";
import { Footer } from "./Footer.jsx";
import { Input } from "./Input.jsx";
import { useState } from "react";
import { AddNote } from "./AddNote.jsx";

function App() {
  function NoNotes() {
    return (
      <div className="App">
        <Header
          test={() => {
            AddNote(setNotes);
          }}
          notes={notes}
        />
        <h3>No note created so far.</h3>
        <Footer />
      </div>
    );
  }

  const [notes, setNotes] = useState([]);
  // (condition) ? (if true) : (if false)
  return notes.length !== 0 ? (
    <div className="App">
      <Header test={AddNote} notes={notes} />
      <ShowNotes notes={notes} />
      <Footer />
    </div>
  ) : (
    NoNotes()
  );
}

export default App;
