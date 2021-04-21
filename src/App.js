import * as React from "react";
import Building from "./components/Building/Building";
import Dialer from "./components/Dialer/";
import Elevator from "./components/Elevator";
import "./styles.css";

const initState = {
  liftPosn: 0,
  selectedFloor: [],
  direction: null,
  open: false
};
export default function App() {
  const [appState, updateApp] = React.useState(initState);

  const moveLift = () => {
    if (!appState.liftPosn) {
      if (appState.selectedFloor.length && appState.selectedFloor[0]) {
        let liftDirection = "up";
        let liftPosn = appState.selectedFloor[0];
        const selectedFloor = appState.selectedFloor.slice(
          1,
          appState.selectedFloor.length
        );
        updateApp((prevState) => {
          return {
            ...prevState,
            liftPosn,
            direction: liftDirection,
            selectedFloor
          };
        });
      }
    } else {
      if (appState.selectedFloor.length) {
        let direction = null;
        console.log("app state -> ", appState);

        if (appState.liftPosn === 0) {
          direction = "up";
        } else if (appState.liftPosn === 9) {
          direction = "down";
        }
        const isUp = direction === "up";
        let liftPosn = isUp
          ? appState.selectedFloor[0]
          : appState.selectedFloor[appState.selectedFloor.length - 1];

        const selectedFloor = isUp
          ? appState.selectedFloor.splice(1, appState.selectedFloor.length)
          : appState.selectedFloor.splice(0, appState.selectedFloor.length - 1);
        updateApp((prevState) => {
          return {
            ...prevState,
            liftPosn,
            direction: direction,
            selectedFloor
          };
        });
      }
    }
  };

  /**
   * floor: number  -
   * @return void
   *  */
  const onFloorSelect = (floor, direction = null) => {
    updateApp((prevState) => {
      return {
        ...prevState,
        selectedFloor: [...prevState.selectedFloor, floor].sort((a, b) => a - b)
      };
    });
  };

  const openLift = () => {
    updateApp((prevState) => {
      return {
        ...prevState,
        open: true
      };
    });

    setTimeout(() => {
      updateApp((prevState) => {
        return {
          ...prevState,
          open: false
        };
      });
    }, 3000);
  };

  const closeLift = () => {
    updateApp((prevState) => {
      return {
        ...prevState,
        open: false
      };
    });
    moveLift();
  };

  React.useEffect(() => {
    if (!appState.direction) moveLift();
  }, [appState.selectedFloor]);

  React.useEffect(() => {
    if (!appState.open) {
      moveLift();
    }
  }, [appState.open]);

  React.useEffect(() => {
    console.log("lift called");
    setTimeout(() => {
      openLift();
    }, 3000);
  }, [appState.liftPosn]);

  return (
    <div className="App">
      <div className="elevatorContainer">
        <Building
          floors={10}
          selectedFloor={appState.selectedFloor}
          onFloorSelect={onFloorSelect}
          openLift={openLift}
        />
        <Elevator
          liftPosn={appState.liftPosn}
          isOpen={appState.open}
          selectedFloor={appState.selectedFloor}
        />
        <Dialer
          selectedFloor={appState.selectedFloor}
          onFloorSelect={onFloorSelect}
          openLift={openLift}
          closeLift={closeLift}
        />
      </div>
    </div>
  );
}
