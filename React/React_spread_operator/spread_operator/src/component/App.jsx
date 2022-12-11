import "../App.css";
import { useState } from "react";
import { ToDoItems } from "./ToDoItems";
import { Input } from "./Input";

function App() {
  const [text, setText] = useState([]);

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        {/* Input has the input field and the function to add a todo with setText */}
        <Input text={text} setText={setText} />

        {/* This goes through the text list, passes the todo item and its index to the ToDoItems component which displays it and 
        also adds a DeleteItem function to it so when it is clicked, it is removed from the list */}
        {text.map((todo, index) => {
          return <ToDoItems todo={todo} setText={setText} key={index} id={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
