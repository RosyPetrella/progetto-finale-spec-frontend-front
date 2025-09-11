import { useContext, useState, useEffect, createContext } from "react";

// Creo il contesto globale
const GlobalContext = createContext();

function GlobalProvider({ children }) {
  //stati globali
  // Lista di tutte le destinazioni fetchate dal server
  const [allDestinations, setAllDestinations] = useState([]);
  // Lista delle destinazioni scelte per il comparatore
  const [compareDestinations, setCompareDestinations] = useState([]);
  // Lista dei preferiti caricata da localStorage
  const [fav, setFav] = useState(() => {
    const savedFav = localStorage.getItem("fav");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  // Fetch delle destinazioni al primo render
  useEffect(() => {
    fetch("http://localhost:3001/destinations")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dati fetchati:", data);
        // salvo nello stato globale
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
      // Se ci sono già 2 destinazioni, non aggiungo
      if (prev.length >= 2) return prev;
      // Altrimenti aggiungiamo la destinazione
      return [...prev, destination];
    });
  };

  // Salvataggio preferiti su localStorage
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  // Gestione preferiti
  const handleFav = (destination) => {
    setFav((prev) => {
      // Se esiste già nei preferiti la rimuovo
      if (prev.find((d) => d.id === destination.id)) {
        const newFav = prev.filter((d) => d.id !== destination.id);
        return newFav;
      }
      // Altrimenti la aggiungo
      return [...prev, destination];
    });
  };

  return (
    // Provider: rendo disponibili stati e funzioni a tutta l'app
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
