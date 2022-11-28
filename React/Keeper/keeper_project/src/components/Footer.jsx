import React from "react";

function Footer() {
  let date = new Date();
  return (
    <div className="footer">
      <p>{date.getFullYear()} - Footer text</p>
    </div>
  );
}

export { Footer };
