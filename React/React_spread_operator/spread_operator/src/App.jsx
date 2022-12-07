import "./App.css";
import { useState } from "react";

let newText = [];

function App() {
  let [text, setText] = useState([]);

  function ToDoText(event) {
    newText.push(event.target.todo.value);
    setText([...newText]);
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <form onSubmit={ToDoText}>
          <input name="todo" type="text" />
          <button>
            <span>Add</span>
          </button>
        </form>
      </div>
      <div>
        <ul>
          {text.map((todo) => {
            return <li>{todo}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
