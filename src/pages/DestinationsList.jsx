import { useState, useContext } from "react";
import React from "react";
import Card from "../components/Card";
import { GlobalContext } from "../Context/context";
import CompareButton from "../components/CompareButton";

export default function DestinationsList() {
  const { allDestinations } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortDropDown = () => setIsSortOpen((prev) => !prev);
  const toggleCategoryDropDown = () => setIsCategoryOpen((prev) => !prev);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  const handleSort = (order) => {
    setSortOrder(order);
    setIsSortOpen(false);
  };

  const filteredDestinations = React.useMemo(() => {
    if (!allDestinations || !Array.isArray(allDestinations)) return [];

    let filtered = allDestinations.filter((d) => {
      if (!query && !category) return true;

      if (query) {
        const searchTerm = query.toLowerCase().trim();
        if (!d.title.toLowerCase().includes(searchTerm)) return false;
      }

      if (category && d.category !== category) return false;

      return true;
    });

    return filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }, [allDestinations, query, category, sortOrder]);

  if (!allDestinations) return <div>Loading...</div>;

  //estraggo ogni categoria per evitare che ci siano duplicati
  const uniqueCategories = React.useMemo(() => {
    if (!allDestinations) return [];

    const categories = [];
    allDestinations.forEach((d) => {
      if (!categories.includes(d.category)) {
        categories.push(d.category);
      }
    });
    return categories;
  }, [allDestinations]);

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsCategoryOpen(false);
  };
  return (
    <>
      <CompareButton />
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
              Category
            </button>
            {isCategoryOpen && (
              <ul className={`dropdown-menu ${isCategoryOpen ? "show" : ""}`}>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleCategory("")}
                  >
                    All categories
                  </button>
                </li>
                {uniqueCategories.map((c) => (
                  <li key={c}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleCategory(c)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
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
                  <button
                    className="dropdown-item"
                    onClick={() => handleSort("asc")}
                  >
                    A-Z
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSort("desc")}
                  >
                    Z-A
                  </button>
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
