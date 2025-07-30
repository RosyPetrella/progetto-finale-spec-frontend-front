import { useContext } from "react";
import { GlobalContext } from "../Context/context";
import { Link } from "react-router-dom";
export default function Card({ destination }) {
  const { allDestinations } = useContext(GlobalContext);

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
        </div>
      </div>
    </>
  );
}
