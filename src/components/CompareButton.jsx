import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/context";

export default function CompareButton() {
  const { compareDestinations } = useContext(GlobalContext);

  const handleClick = (e) => {
    if (compareDestinations.length === 0) {
      e.preventDefault();
      window.alert("Select two destinations to compare");
    } else if (compareDestinations.length === 1) {
      e.preventDefault();
      window.alert("Select one more destination to compare");
    }
  };

  return (
    <>
      {/* <div className="container position-relative compare-container"> */}
      <Link to="/comparator" onClick={handleClick}>
        <button
          className={`lux-btn ${
            compareDestinations.length === 2
              ? "active-compare"
              : "inactive-compare"
          }`}
        >
          Compare Destinations
        </button>
      </Link>
      {/* </div> */}
    </>
  );
}
