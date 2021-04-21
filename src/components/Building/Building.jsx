import Floor from "../Floor/";

const Building = (props) => {
  const { onFloorSelect } = props;
  const mapMyFloors = () => {
    const floorsArr = [];
    for (let i = 9; i >= 0; i--) {
      floorsArr.push(<Floor onFloorSelect={onFloorSelect} key={i} value={i} />);
    }
    return floorsArr;
  };

  return <div className="BuildingContainer">{mapMyFloors()}</div>;
};

export default Building;
