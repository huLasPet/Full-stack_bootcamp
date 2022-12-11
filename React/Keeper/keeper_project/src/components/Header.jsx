import React from "react";

function Header(props) {
  return (
    <div className="headerDiv">
      <h1>Keeper</h1>
      <button
        onClick={() => {
          props.test(props.notes);
        }}
        className="btn btn-outline-light btn-sm"
      >
        Create a test note
      </button>
    </div>
  );
}

export { Header };
