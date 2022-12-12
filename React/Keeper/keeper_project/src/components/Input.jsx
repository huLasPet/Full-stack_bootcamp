import React from "react";

function Input(props) {
  return (
    <form
      onSubmit={(event) => {
        props.add(event, props);
      }}
    >
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" class="form-control" name="title" id="title"></input>
      </div>
      <div class="form-group">
        <label for="noteText">Note text:</label>
        <textarea class="form-control" name="note" id="noteText" rows="3"></textarea>
      </div>
      <button className="btn btn-outline-dark btn-sm">Create a note</button>
    </form>
  );
}

export { Input };
