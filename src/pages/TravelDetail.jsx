import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/context";
import { useParams } from "react-router-dom";
import HeartIcon from "../components/HeartIcon";

export default function TravelDetail() {
  const { id } = useParams(); //Legge l'id della destinazione dall'URL
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // handleCompare per aggiungere/rimuovere destinazioni dal confronto
  // compareDestinations array di destinazioni selezionate per il confronto
  const { handleCompare, compareDestinations } = useContext(GlobalContext);

  // useEffect per caricare i dati della destinazione al mount o quando cambia l'id
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await fetch(`http://localhost:3001/destinations/${id}`);
        if (!res.ok) throw new Error(`Errore: ${res.status}`);
        const data = await res.json();
        // Aggiorno lo stato con la destinazione ricevuta
        setDestination(data.destination);
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setIsLoading(false); // Fine caricamento (sia in caso di successo che errore)
      }
    };

    fetchDestination(); // Chiamata alla funzione fetch
  }, [id]); // Si ri-esegue se cambia l'id della destinazione

  if (isLoading) return <p>Loading...</p>;
  if (!destination)
    return (
      <p
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Destination not found
      </p>
    );

  // Controllo se la destinazione è già selezionata per il confronto
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
            <h4 className="detail-place"> Where: {destination.place}</h4>
            <p className="detail-category">{destination.category}</p>
            <span className="detail-accommodation">
              Accomodation: {destination.accommodation}
            </span>
            <span className="detail-price">€ {destination.price}</span>
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
