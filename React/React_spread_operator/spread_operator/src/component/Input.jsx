function Input(props) {
  let newText = props.text;
  function AddToDo(event) {
    newText.push(event.target.todo.value);
    //Spread operator adds each elements from newText instead of adding the whole array as 1 element inside a []
    props.setText([...newText]);
    event.preventDefault();
  }

  return (
    <form onSubmit={AddToDo}>
      <input name="todo" type="text" />
      <button>
        <span>Add</span>
      </button>
    </form>
  );
}

export { Input };
