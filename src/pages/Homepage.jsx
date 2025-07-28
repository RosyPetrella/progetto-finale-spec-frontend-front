import { useState } from "react";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");

  const toggleSortDropDown = () => setIsSortOpen((prev) => !prev);
  const toggleCategoryDropDown = () => setIsCategoryOpen((prev) => !prev);
  const handleSearch = (e) => setQuery(e.target.value);
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

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
    </>
  );
}
