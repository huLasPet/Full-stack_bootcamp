import React from "react";

function Note(props) {
  return (
    <div class="col-sm-4">
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
