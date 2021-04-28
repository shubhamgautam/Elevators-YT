import "./styles.css";

const Elevator = (props) => {
  const { isOpen, liftPosn } = props;
  const floor = 9 - liftPosn;
  const elevStyles = {
    top: `${floor * 100 + 220}px`
  };
  const compClass = `flexRow elev ${isOpen ? "open" : "close"}`;
  return (
    <div style={elevStyles} className={compClass}>
      <div className="gate left " />
      <div className="gate right " />
    </div>
  );
};

export default Elevator;
