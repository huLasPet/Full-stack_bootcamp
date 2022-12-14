import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const test = "Test const";
const test2 = "Test const 2";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Test</h1>
    <h2>Test2</h2>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>
        {test} {test2}
      </li>
      <li>{`But with template literals -> ${test} ${test2}`}</li>
    </ul>
  </div>
);

const action = "practice";
const action2 = "not practice";
const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyoH8dKqalMtOOTVYbaxN-qZk_cTLOZtiFEg&usqp=CAU";
let inlineStyle = { color: "purple", fontSize: 24 };

root.render(
  <div>
    <p
      className="paragraph-test"
      contentEditable="true"
      spellCheck="false"
    >{`Some more template literal ${action} here that overwrites the previous root.render`}</p>
    <p
      style={inlineStyle}
    >{`And some other ${action2} here with inline colors using an object that can be changed without changing this part of the code`}</p>
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyoH8dKqalMtOOTVYbaxN-qZk_cTLOZtiFEg&usqp=CAU"
        alt=""
        className="by100"
      />
      <img src={img} alt="Can add pictures this way too" />
    </div>
  </div>
);
