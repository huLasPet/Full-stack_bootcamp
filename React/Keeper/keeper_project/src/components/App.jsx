import React from "react";
import { Header } from "./Header.jsx";
import { ShowNotes } from "./ShowNotes.jsx";
import { Footer } from "./Footer.jsx";
import { Input } from "./Input.jsx";
import { useState } from "react";
import { AddNote } from "./AddNote.js";
import { DeleteNote } from "./DeleteNote.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  return (
    <div className="App">
      <Header />
      <Input notes={notes} add={AddNote} setNotes={setNotes} />
      <ShowNotes notes={notes} delete={DeleteNote} setNotes={setNotes} />
      <Footer />
    </div>
  );
}

export default App;
