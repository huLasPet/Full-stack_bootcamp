import { useState } from "react";

function DisplayText(props) {
  const [crossedOut, setcrossedOut] = useState("");

  function cross(event) {
    // (condition) ? (if true) : (if false)
    crossedOut !== "crossed" ? setcrossedOut("crossed") : setcrossedOut("");
  }

  return (
    <div>
      <ul>
        <div onMouseOver={cross}>
          <li
            onClick={() => {
              props.DeleteItem(props.id);
            }}
            className={crossedOut}
          >
            {props.text}
          </li>
        </div>
      </ul>
    </div>
  );
}

export { DisplayText };
