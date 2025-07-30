import { useEffect, useState, useContext, use } from "react";
import React from "react";
import Card from "../components/Card";
import { GlobalContext } from "../Context/context";

export default function DestinationsList() {
  const { allDestinations } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");

  const toggleSortDropDown = () => setIsSortOpen((prev) => !prev);
  const toggleCategoryDropDown = () => setIsCategoryOpen((prev) => !prev);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  const filteredDestinations = React.useMemo(() => {
    if (!allDestinations || !Array.isArray(allDestinations)) return [];
    if (!query) return allDestinations;

    const searchTerm = query.toLowerCase().trim();
    return allDestinations.filter(
      (d) =>
        d.title.toLowerCase().includes(searchTerm) ||
        d.category.toLowerCase().includes(searchTerm)
    );
  }, [allDestinations, query]);

  if (!allDestinations) return <div>Loading...</div>;

  return (
    <>
      <div className="container d-flex  mt-2">
        {/* Barra di ricerca */}
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search..."
            className="form-control p-2 rounded-5 "
            value={query}
            onChange={handleSearch}
          />
        </div>
        {/* Filtra per categoria */}
        <div className="category">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              onClick={toggleCategoryDropDown}
            >
              Categoria
            </button>
            {isCategoryOpen && (
              <ul className={`dropdown-menu ${isCategoryOpen ? "show" : ""}`}>
                <li>##CATEGORIA</li>
              </ul>
            )}
          </div>
        </div>
        {/* Orina per */}
        <div className="sort">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              onClick={toggleSortDropDown}
            >
              Sort by
            </button>
            {isSortOpen && (
              <ul className={`dropdown-menu ${isSortOpen ? "show" : ""}`}>
                <li>
                  <button className="dropdown-item" onClick={handleSort}>
                    A-Z
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">Z-A</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-evenly">
          {filteredDestinations && filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <div className="col-4" key={destination.id}>
                <Card destination={destination} />
              </div>
            ))
          ) : (
            <p>No destinations found</p>
          )}
        </div>
      </div>
    </>
  );
}
