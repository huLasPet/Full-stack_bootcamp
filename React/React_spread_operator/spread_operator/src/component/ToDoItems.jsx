function ToDoItems(props) {
  function DeleteItem(id) {
    props.setText((text) => {
      return text.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <ul>
        <li
          onClick={() => {
            DeleteItem(props.id);
          }}
        >
          {props.todo}
        </li>
      </ul>
    </div>
  );
}

export { ToDoItems };
