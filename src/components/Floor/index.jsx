import * as React from "react";
import "./styles.css";
import FloorButton from "../buttons/buttons";

const Floor = () => {
  return (
    <div className="FloorContainer">
      <FloorButton label={"Up"} />
      <FloorButton label={"down"} />
    </div>
  );
};

export default Floor;
