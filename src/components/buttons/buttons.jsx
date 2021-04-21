import "./styles.css";

const buttons = (props) => {
  const btnClick = () => {
    console.log("clicked", props.label);
  };

  return (
    <button className="fluidButton active" onClick={btnClick}>
      {props.label}
    </button>
  );
};

export default buttons;
