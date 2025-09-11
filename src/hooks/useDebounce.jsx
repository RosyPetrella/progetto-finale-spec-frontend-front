import { useState, useEffect } from "react";

// Custom hook: prende un valore e restituisce la sua versione "debounced"
export default function useDebounce(value, delay) {
  // Stato interno che contiene il valore "ritardato"
  const [debounce, setDebounce] = useState(value);

  // Ogni volta che value o delay cambiano
  useEffect(() => {
    // Imposto un timer che aggiornerà lo stato "debounce" dopo `delay`
    const timer = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      // Cleanup: se value cambia prima che scada il timer, cancello il precedente
      clearTimeout(timer);
    };
  }, [value, delay]);

  // Ritorno il valore "debounced" da usare nei componenti
  return debounce;
}
