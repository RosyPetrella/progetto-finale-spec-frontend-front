import { useContext } from "react";
import { GlobalContext } from "../Context/context";

export default function HeartIcon({ destination }) {
  const { fav, handleFav } = useContext(GlobalContext);

  const isFav = fav.find((f) => f.id === destination.id);

  return (
    <button className="btn heart-button" onClick={() => handleFav(destination)}>
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}
