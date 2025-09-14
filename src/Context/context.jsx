import { useState, useEffect, createContext } from "react";

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

  // Fetch delle destinazioni al mount del componente
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
      // Cerco dentro l'array precedente (prev) una destinazione con lo stesso id
      if (prev.find((d) => d.id === destination.id)) {
        // Se la trovo, la rimuovo e ritorno un nuovo array senza quell'id
        return prev.filter((d) => d.id !== destination.id);
      }
      // Se non era presente, controllo se ci sono già 2 elementi
      if (prev.length >= 2) return prev; // Se ci sono già 2 destinazioni non aggiungo nulla (ritorno lo stesso array)
      // Altrimenti aggiungo la destinazione
      return [...prev, destination];
    });
  };

  // Salvataggio preferiti su localStorage
  useEffect(() => {
    // Ogni volta che lo stato "fav" cambia, salvo l'array aggiornato dei preferiti in localStorage
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  // Funzione che gestisce l'aggiunta o la rimozione dai preferiti
  const handleFav = (destination) => {
    setFav((prev) => {
      // Controllo se la destinazione è già presente nei preferiti
      if (prev.find((d) => d.id === destination.id)) {
        // Se è presente, la rimuovo creando un nuovo array
        const newFav = prev.filter((d) => d.id !== destination.id);
        // Ritorno il nuovo array senza quella destinazione
        return newFav;
      }
      // Se invece non era presente, la aggiungo ai preferiti e creo un nuovo array con i preferiti attuali + la nuova destinazione
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
