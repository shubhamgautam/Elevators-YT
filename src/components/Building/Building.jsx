import Floor from "../Floor/";

const Building = (props) => {
  const { floors } = props;
  const mapMyFloors = () => {
    const floorsArr = [];
    for (let i = 0; i < floors; i++) {
      floorsArr.push(<Floor key={i} value={i} />);
    }
    return floorsArr;
  };

  return <div className="BuildingContainer">{mapMyFloors()}</div>;
};

export default Building;
