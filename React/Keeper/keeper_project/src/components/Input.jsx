import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

function Input(props) {
  return (
    <form
      className="inputForm"
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
      <button className="submitButton" type="submit">
        <AddBoxIcon />
      </button>
    </form>
  );
}

export { Input };
