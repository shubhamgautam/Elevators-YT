import * as React from "react";
import "./styles.css";
import FloorButton from "../buttons/buttons";

const Floor = (props) => {
  const { value: floor, onFloorSelect } = props;
  return (
    <div className="FloorContainer">
      {!floor || floor === 9
        ? [
            <FloorButton
              onFloorSelect={onFloorSelect}
              floor={floor}
              label={""}
            />
          ]
        : [
            <>
              <FloorButton
                onFloorSelect={onFloorSelect}
                floor={floor}
                label={"Up"}
              />
              <FloorButton
                onFloorSelect={onFloorSelect}
                floor={floor}
                label={"down"}
              />
            </>
          ]}
    </div>
  );
};

export default Floor;
