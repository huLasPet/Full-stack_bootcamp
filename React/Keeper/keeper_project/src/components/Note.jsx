import React from "react";

function Note() {
  let notes = [];
  for (let i = 0; i < 5; i++) {
    notes.push(
      <div class="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h4>Notes come here</h4>
          </div>
        </div>
      </div>
    );
  }
  return notes;
}

export { Note };
