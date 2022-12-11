function DisplayText(props) {
  return (
    <div>
      <ul>
        <li
          onClick={() => {
            props.DeleteItem(props.id);
          }}
        >
          {props.text}
        </li>
      </ul>
    </div>
  );
}

export { DisplayText };
