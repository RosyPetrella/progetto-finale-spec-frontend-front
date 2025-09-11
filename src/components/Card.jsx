import { useContext } from "react";
import { GlobalContext } from "../Context/context";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

export default function Card({ destination }) {
  // prendo dal context la funzione per confrontare e l'array delle destinazioni scelte
  const { handleCompare, compareDestinations } = useContext(GlobalContext);

  // controllo se la destinazione è già presente nella lista dei confronti
  // find restituisce l'oggetto trovato o undefined
  const isSelected = compareDestinations.find((d) => d.id === destination.id);
  return (
    <>
      <div className="lux-card">
        <div className="lux-card-body">
          <h5 className="lux-card-title">{destination.title}</h5>
          <span className="lux-card-category">{destination.category}</span>

          <div className="lux-card-actions">
            <Link to={`/destinations/${destination.id}`} className="lux-btn">
              Show details
            </Link>

            {/* Bottone compare:
                - classe dinamica in base allo stato (se è selezionata o no)
                - onClick chiama handleCompare passando l'oggetto destination */}
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

        <div className="lux-card-footer">
          <HeartIcon destination={destination} />
        </div>
      </div>
    </>
  );
}
