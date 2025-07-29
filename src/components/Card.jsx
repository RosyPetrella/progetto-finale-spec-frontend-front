import { useContext } from "react";
import { GlobalContext } from "../Context/context";
import { Link } from "react-router-dom";
export default function Card() {
  const { allDestinations } = useContext(GlobalContext);

  return (
    <>
      <div className="container mt-4 ">
        <div className="row justify-content-evenly">
          {allDestinations.map((d) => (
            <div className="card col-4 g-4 m-3" key={d.id}>
              <img src={d.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{d.title}</h5>
                <span className="card-text">{d.category}</span>
                <br />
                <Link to={`/destinations/${d.id}`} className="btn btn-primary">
                  Go somewhere
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
