import React from "react";

function Note(props) {
  return (
    <div className="col-sm-3">
      <div className="card">
        <div className="card-body">
          <h4>{props.title}</h4>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export { Note };
