import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/context";
import { useParams } from "react-router-dom";
import HeartIcon from "../components/HeartIcon";

export default function TravelDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleCompare, compareDestinations } = useContext(GlobalContext);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await fetch(`http://localhost:3001/destinations/${id}`);
        if (!res.ok) throw new Error(`Errore: ${res.status}`);
        const data = await res.json();
        console.log("Dati ricevuti:", data);
        setDestination(data.destination);
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (isLoading) return <p>Caricamento in corso...</p>;
  if (!destination) return <p>Destinazione non trovata</p>;

  const isSelected = compareDestinations.find((d) => d.id === destination.id);
  return (
    <>
      <div className="container">
        <div className="detailCard d-flex">
          <div>
            <img
              className="detailImage"
              src={destination.image}
              alt={destination.title}
            />
          </div>
          <div className="ms-4">
            <h2>{destination.title}</h2>
            <h4>{destination.place}</h4>
            <p>{destination.category}</p>
            <span>{destination.accommodation}</span>
            <span>{destination.price}</span>
            <p>{destination.description}</p>
            <button
              className={`btn ${
                isSelected ? "btn-danger" : "btn-success"
              } mt-3`}
              onClick={() => handleCompare(destination)}
            >
              {isSelected ? "Remove compare" : "Compare"}
            </button>
            <HeartIcon destination={destination} />
          </div>
        </div>
      </div>
    </>
  );
}
