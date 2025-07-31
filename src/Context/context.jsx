import { useContext, useState, useEffect, createContext } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  //state
  const [allDestinations, setAllDestinations] = useState([]);
  const [compareDestinations, setCompareDestinations] = useState([]);
  const [fav, setFav] = useState([]);

  //fetch
  useEffect(() => {
    fetch("http://localhost:3001/destinations")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dati fetchati:", data);
        setAllDestinations(data);
      })

      .catch((err) => console.error(err));
  }, []);

  const handleCompare = (destination) => {
    setCompareDestinations((prev) => {
      // Se la destinazione è già presente, la rimuovo
      if (prev.find((d) => d.id === destination.id)) {
        return prev.filter((d) => d.id !== destination.id);
      }
      // Se ci sono già 2 destinazioni, non aggiungiamo
      if (prev.length >= 2) return prev;
      // Altrimenti aggiungiamo la destinazione
      return [...prev, destination];
    });
  };

  const handleFav = (destination) => {
    setFav((prev) => {
      if (prev.find((d) => d.id === destination.id)) {
        return prev.filter((d) => d.id !== destination.id);
      }
      return [...prev, destination];
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        allDestinations,
        setAllDestinations,
        compareDestinations,
        setCompareDestinations,
        handleCompare,
        fav,
        setFav,
        handleFav,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
