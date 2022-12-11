function Input(props) {
  return (
    <form onSubmit={props.ToDoText}>
      <input name="todo" type="text" />
      <button>
        <span>Add</span>
      </button>
    </form>
  );
}

export { Input };
