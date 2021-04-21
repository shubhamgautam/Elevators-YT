import * as React from "react";
import Building from "./components/Building/Building";
import Dialer from "./components/Dialer/";
import Elevator from "./components/Elevator";
import "./styles.css";

const initState = {
  liftPosn: 9,
  selectedFloor: [],
  direction: null,
  open: false
};
export default function App() {
  const [appState, updateApp] = React.useState(initState);
  const onFloorSelect = (floor) => {
    updateApp((prevState) => {
      return {
        ...prevState,
        selectedFloor: [...prevState.selectedFloor, floor]
      };
    });
  };

  return (
    <div className="App">
      <div className="elevatorContainer">
        <Building
          floors={10}
          selectedFloor={appState.selectedFloor}
          onFloorSelect={onFloorSelect}
        />
        <Elevator
          liftPosn={appState.liftPosn}
          selectedFloor={appState.selectedFloor}
        />
        <Dialer
          selectedFloor={appState.selectedFloor}
          onFloorSelect={onFloorSelect}
        />
      </div>
    </div>
  );
}
