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
root.render(
  <div>
    <p>{`Some more template literal ${action} here that overwrites the previous root.render`}</p>
    <p>{`And some other ${action2} here`}</p>
  </div>
);
console.log(`${test}`);
