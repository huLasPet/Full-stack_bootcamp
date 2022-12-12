import React, { useState } from "react";

function Note(props) {
  const [fontColor, setFontColor] = useState("black");

  let divStyle = {
    color: fontColor,
  };

  function changeColor() {
    if (fontColor === "red") {
      setFontColor("black");
    } else {
      setFontColor("red");
    }
  }

  return (
    <div className="col-sm-3">
      <div className="card">
        <div className="card-body">
          <h4 onClick={changeColor} style={divStyle}>
            {props.title}
          </h4>
          <p>{props.text}</p>
          <button onClick={props.delete}>Delete note </button>
        </div>
      </div>
    </div>
  );
}

export { Note };
