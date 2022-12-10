import "../App.css";
import { useState } from "react";
import { DisplayText } from "./Display";

let newText = [];

function App() {
  const [text, setText] = useState([]);

  function ToDoText(event) {
    newText.push(event.target.todo.value);
    //Spread operator adds all elements from newText instead of adding the whole array as 1 element inside a []
    setText([...newText]);
    event.preventDefault();
  }

  function DeleteItem(id) {
    setText((text) => {
      return text.filter((item, index) => {
        return index !== id;
      });
    });
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
        {text.map((todo, index) => {
          return <DisplayText text={todo} DeleteItem={DeleteItem} key={index} id={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
