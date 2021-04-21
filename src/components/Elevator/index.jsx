import "./styles.css";

const Elevator = (props) => {
  const floor = 9 - props.liftPosn;
  const elevStyles = {
    top: `${floor * 100 + 220}px`
  };

  return (
    <div style={elevStyles} className="flexRow elev close">
      <div className="gate left " />
      <div className="gate right " />
    </div>
  );
};

export default Elevator;
