import { useContext } from "react";
import { GlobalContext } from "../Context/context";

export default function Comparator() {
  const { compareDestinations } = useContext(GlobalContext);

  if (compareDestinations.length === 0) {
    return (
      <div className="container mt-4">
        <h2>No destination selected for comparison</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h2>Compare destinatios</h2>
        <div className="row">
          {compareDestinations.map((d) => (
            <div className="card" key={destination.id}>
              <div className="card">
                <img
                  src={destination.image}
                  className="card-img-top"
                  alt={destination.title}
                />
                <div className="card-body">
                  <h3 className="card-title">{destination.title}</h3>
                  <p className="card-text">Category: {destination.category}</p>
                  <p className="card-text">Place: {destination.place}</p>
                  <p className="card-text">Price: {destination.price}</p>
                  <p className="card-text">
                    Accommodation: {destination.accommodation}
                  </p>
                  <p className="card-text">{destination.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
