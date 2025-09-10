import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/context";
import HeartIcon from "./HeartIcon";

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

  if (compareDestinations.length === 0) {
    return (
      <div className="container mt-4">
        <h2>No destinations selected for comparison</h2>
        <p>
          Select destinations to compare by clicking the "Compare" button on the
          cards
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="container comparator-container">
        <h2 className="comparator-title">Compare Destinations</h2>
        <div className="row justify-content-center">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="col-12 col-md-6 col-lg-5 comparator-card-wrapper"
            >
              <div className="comparator-card">
                <div className="comparator-img-wrapper">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="comparator-image"
                  />
                  <div className="heart-icon-fav">
                    <HeartIcon destination={dest} />
                  </div>
                </div>
                <div className="comparator-details">
                  <h3 className="card-title">{dest.title}</h3>
                  <div className="comparator-line">
                    <span>Category:</span> {dest.category}
                  </div>
                  <div className="comparator-line">
                    <span>Place:</span> {dest.place}
                  </div>
                  <div className="comparator-line">
                    <span>Price:</span> {dest.price}
                  </div>
                  <div className="comparator-line">
                    <span>Accommodation:</span> {dest.accommodation}
                  </div>
                  <div className="comparator-description">
                    {dest.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
