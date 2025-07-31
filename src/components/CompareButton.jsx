import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/context";

export default function CompareButton() {
  const { compareDestinations } = useContext(GlobalContext);

  if (compareDestinations.length === 0) return null;

  return (
    <>
      <div className="container">
        <Link to={"/comparator"}>
          <button className="btn btn-primary">Compare destinations</button>
        </Link>
      </div>
    </>
  );
}
