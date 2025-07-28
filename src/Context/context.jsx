import { useContext, useState, useEffect, createContext } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  //state
  const [allDestinations, setAllDestinations] = useState([]);

  //fetch
  useEffect(() => {
    fetch(`http://localhost:3001/destinations`)
      .then((res) => res.json())
      .then((data) => setAllDestinations(data))
      .catch((err) => console.error(err));
  }, []);
}

export { GlobalContext, GlobalProvider };
