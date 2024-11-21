import React from "react";

function Cell({ color, onClick }) {
  return (
    <div className="cell" onClick={onClick}>
      {color && <div className={`token ${color}`} />}
    </div>
  );
}

export default Cell;
