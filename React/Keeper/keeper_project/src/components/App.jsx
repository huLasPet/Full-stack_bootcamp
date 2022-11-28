import React from "react";
import { Header } from "./Header.jsx";
import { Note } from "./Note.jsx";
import { Footer } from "./Footer.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Note title="Note title" text="Note text" />
      <Note title="Note title 2" text="Note text 2" />
      <Footer />
    </div>
  );
}

export default App;
