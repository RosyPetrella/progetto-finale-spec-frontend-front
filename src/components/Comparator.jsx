import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/context";

export default function Comparator() {
  const { compareDestinations } = useContext(GlobalContext);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    setDestinations([]);
    compareDestinations.forEach((dest) => {
      fetch(`http://localhost:3001/destinations/${dest.id}`)
        .then((res) => res.json())
        .then((data) => {
          setDestinations((prev) => {
            if (prev.find((d) => d.id === data.destination.id)) {
              return prev;
            }
            return [...prev, data.destination];
          });
        })
        .catch((err) => console.error(err));
    });
  }, [compareDestinations]);

  return (
    <>
      <div className="container mt-4">
        <h2>Compare destinations</h2>
        <div className="row justify-content-between">
          {destinations.map((dest) => (
            <div key={dest.id} className="col-5">
              <div className="card">
                <img
                  src={dest.image}
                  className="card-img-top"
                  alt={dest.title}
                />
                <div className="card-body">
                  <h3 className="card-title">{dest.title}</h3>
                  <p className="card-text">Category: {dest.category}</p>
                  <p className="card-text">Place: {dest.place}</p>
                  <p className="card-text">Price: {dest.price}</p>
                  <p className="card-text">
                    Accommodation: {dest.accommodation}
                  </p>
                  <p className="card-text">{dest.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
