import { useContext } from "react";
import { GlobalContext } from "../Context/context";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

export default function Card({ destination }) {
  const { handleCompare, compareDestinations } = useContext(GlobalContext);

  const isSelected = compareDestinations.find((d) => d.id === destination.id);
  return (
    <>
      <div className="lux-card">
        <div className="lux-card-body">
          <h5 className="lux-card-title">{destination.title}</h5>
          <span className="lux-card-category">{destination.category}</span>

          <div className="lux-card-actions">
            <Link to={`/destinations/${destination.id}`} className="lux-btn">
              Show details
            </Link>
            <button
              className={`lux-btn ${
                isSelected ? "active-compare" : "inactive-compare"
              }`}
              onClick={() => handleCompare(destination)}
            >
              {isSelected ? "Remove" : "Compare"}
            </button>
          </div>
        </div>

        <div className="lux-card-footer">
          <HeartIcon destination={destination} />
        </div>
      </div>
    </>
  );
}
