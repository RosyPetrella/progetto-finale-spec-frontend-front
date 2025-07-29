import { useContext, useState, useEffect, createContext } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  //state
  const [allDestinations, setAllDestinations] = useState([]);

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

  return (
    <GlobalContext.Provider value={{ allDestinations, setAllDestinations }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
