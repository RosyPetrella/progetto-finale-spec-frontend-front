import { useContext } from "react";
import { GlobalContext } from "../Context/context";
import { Link } from "react-router-dom";
export default function Card({ destination }) {
  const { handleCompare, compareDestinations } = useContext(GlobalContext);

  const isSelected = compareDestinations.find((d) => d.id === destination.id);
  return (
    <>
      <div className="card m-3">
        <div className="card-body">
          <h5 className="card-title">{destination.title}</h5>
          <span className="card-text">{destination.category}</span>
          <br />
          <Link
            to={`/destinations/${destination.id}`}
            className="btn btn-primary"
          >
            Show details
          </Link>
          <button
            className={`btn ${isSelected ? "btn-danger" : "btn-success"}`}
            onClick={() => handleCompare(destination)}
          >
            {isSelected ? "Remove Compare" : "Compare"}
          </button>
        </div>
      </div>
    </>
  );
}
