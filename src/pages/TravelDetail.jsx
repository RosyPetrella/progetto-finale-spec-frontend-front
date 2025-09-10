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
      <div className="container d-flex justify-content-center">
        <div className="detail-card">
          <div className="detail-img-wrapper">
            <img
              className="detail-image"
              src={destination.image}
              alt={destination.title}
            />
            <div className="heart-icon">
              <HeartIcon destination={destination} />
            </div>
          </div>
          <div className="detail-info">
            <h2 className="detail-title">{destination.title}</h2>
            <h4 className="detail-place">{destination.place}</h4>
            <p className="detail-category">{destination.category}</p>
            <span className="detail-accommodation">
              {destination.accommodation}
            </span>
            <span className="detail-price">{destination.price}</span>
            <p className="detail-description">{destination.description}</p>
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
      </div>
    </>
  );
}
