import React from "react";
import { Header } from "./Header.jsx";
import { Note } from "./Note.jsx";
import { Footer } from "./Footer.jsx";
import { notes } from "./Notes.js";

function App() {
  return (
    <div className="App">
      <Header />
      {/* Map is the same as forEach - would be better here but this is practice.
       Need to add the key as well even if not displayed otherwise it will throw errors */}
      {notes.map((props) => {
        return <Note key={props.key} title={props.title} text={props.text} />;
      })}
      <Footer />
    </div>
  );
}

export default App;
