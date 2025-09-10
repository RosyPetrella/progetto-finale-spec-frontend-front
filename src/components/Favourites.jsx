import { useContext } from "react";
import { GlobalContext } from "../Context/context";
import Card from "./Card";
import CompareButton from "./CompareButton";

export default function Favourites() {
  const { fav } = useContext(GlobalContext);

  if (fav.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Your list is empty</h2>
      </div>
    );
  }

  return (
    <>
      {/* <div className="lux-filters">
        <CompareButton />
      </div>

      <div className="container mb-5">
        <h2 className="my-4">My Favourites</h2>
        <div className="row">
          {fav.map((destination) => (
            <div key={destination.id} className="col-4 mb-4">
              <Card destination={destination} />
            </div>
          ))}
        </div>
      </div> */}
      <div className="container mb-5">
        <div className="lux-filters">
          <div className="filters-group">
            <h2 className="my-4">My Favourites</h2>
          </div>
          <CompareButton />
        </div>

        <div className="row">
          {fav.map((destination) => (
            <div key={destination.id} className="col-4 mb-4">
              <Card destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
