import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/context";

export default function CompareButton() {
  const { compareDestinations } = useContext(GlobalContext);

  const [showMessage, setShowMessage] = useState(false);

  const handleClick = (e) => {
    if (compareDestinations.length < 2) {
      e.preventDefault(); // Previene la navigazione
      setShowMessage(true);
      // Nascondi il messaggio dopo 3 secondi
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <>
      <div className="container position-relative">
        <Link to="/comparator" onClick={handleClick}>
          <button
            className={`btn ${
              compareDestinations.length === 2 ? "btn-primary" : "btn-secondary"
            }`}
          >
            Compare destinations
          </button>
        </Link>

        {showMessage && compareDestinations.length === 0 && (
          <div className="alert alert-warning mt-2">
            Select at least one destination to compare
          </div>
        )}

        {showMessage && compareDestinations.length === 1 && (
          <div className="alert alert-info mt-2">
            Select one more destination to compare
          </div>
        )}
      </div>
    </>
  );
}
