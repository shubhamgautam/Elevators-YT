import * as React from "react";
import Building from "./components/Building/Building";
import Dialer from "./components/Dialer/";
import Elevator from "./components/Elevator";
import "./styles.css";

const initState = {
  liftPosn: 0,
  upFlrs: [],
  downFlrs: [],
  selectedFloor: [],
  direction: null,
  open: false,
  move: false
};

export default function App() {
  const [appState, updateApp] = React.useState(initState);

  const moveLift = (liftPosn) => {
    console.log("appState", appState);
    if (!appState.liftPosn) {
      let liftDirection = "up";
      let liftPosn = appState.upFlrs[0];
      const selectedFloor = appState.upFlrs.slice(1, appState.upFlrs.length);
      updateApp((prevState) => {
        return {
          ...prevState,
          liftPosn,
          direction: liftDirection,
          upFlrs: selectedFloor
        };
      });
    } else {
      let isUp = appState.direction === "up";
      let direction = isUp ? "up" : "down";
      if (!appState.upFlrs.length && !appState.downFlrs.length) {
        updateApp((prevState) => {
          return {
            ...prevState,
            direction: null,
            move: false
          };
        });
        return;
      }

      if (isUp) {
        if (appState.upFlrs.length) {
          const upFlrs = [...appState.upFlrs];
          let liftPosn = upFlrs.shift();
          direction =
            !upFlrs.length && !appState.downFlrs.lenght ? null : direction;
          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              direction: direction,
              upFLrs: upFlrs
            };
          });
        } else if (appState.downFlrs.length) {
          direction = "down";
          isUp = false;
          const downFloorArr = [...appState.downFlrs];
          const liftPosn = downFloorArr.shift();
          direction =
            !downFloorArr.length && !appState.upFlrs.lenght ? null : direction;
          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              direction: direction,
              downFlrs: downFloorArr
            };
          });
        }
      } else {
        if (appState.downFlrs.length) {
          const downFloorArr = [...appState.downFlrs];
          const liftPosn = downFloorArr.shift();
          direction =
            !downFloorArr.length && !appState.upFlrs.lenght ? null : direction;

          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              downFlrs: downFloorArr
            };
          });
        } else if (appState.upFlrs.length) {
          direction = "up";
          isUp = true;
          const upFlrArr = [...appState.upFlrs];
          const liftPosn = upFlrArr.shift();
          direction =
            !upFlrArr.length && !appState.downFlrs.lenght ? null : direction;
          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              direction: direction,
              upFlrs: upFlrArr
            };
          });
        }
      }
    }
  };

  /**
   * floor: number  -
   * @return void
   *  */
  const onFloorSelect = (floor, direction = null) => {
    if (floor === appState.liftPosn) {
      return;
    }
    let isUp = false;
    if (direction) {
      isUp = direction === "up";
    } else {
      const currPosition = appState.liftPosn || 0;
      isUp = floor > currPosition;
    }

    updateApp((prevState) => {
      return {
        ...prevState,
        upFlrs: isUp
          ? [...prevState.upFlrs, floor].sort((a, b) => a - b)
          : prevState.upFlrs,
        move: true,
        downFlrs: !isUp
          ? [...prevState.downFlrs, floor].sort((a, b) => b - a)
          : prevState.downFlrs
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
    moveLift();
  }, [appState.move]);

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
          selectedFloor={[...appState.upFlrs, ...appState.downFlrs]}
          onFloorSelect={onFloorSelect}
          openLift={openLift}
          closeLift={closeLift}
        />
      </div>
    </div>
  );
}
