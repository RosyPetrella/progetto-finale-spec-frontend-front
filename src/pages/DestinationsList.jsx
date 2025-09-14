import { useState, useContext, useEffect, useMemo } from "react";
import React from "react";
import Card from "../components/Card";
import { GlobalContext } from "../Context/context";
import CompareButton from "../components/CompareButton";
import useDebounce from "../hooks/useDebounce";
import { useParams } from "react-router-dom";

export default function DestinationsList() {
  // Prendo tutte le destinazioni dal contesto globale
  const { allDestinations } = useContext(GlobalContext);
  // Stati locali
  const [category, setCategory] = useState(""); // Categoria selezionata
  const [isSortOpen, setIsSortOpen] = useState(false); // Dropdown ordinamento
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Dropdown categorie
  const [sortOrder, setSortOrder] = useState("asc"); // Ordinamento alfabetico
  const [searchTerm, setSearchTerm] = useState(""); // Testo digitato nella ricerca
  const debouncedSearch = useDebounce(searchTerm, 500); // Custom Hook: ritarda la ricerca di 500ms
  const { category: urlCategory } = useParams(); // Leggo la categoria dall’URL

  // Funzioni per aprire/chiudere i dropdown
  const toggleSortDropDown = () => setIsSortOpen((prev) => !prev);
  const toggleCategoryDropDown = () => setIsCategoryOpen((prev) => !prev);

  // Aggiorna il testo della ricerca ad ogni input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  // Imposta tipo di ordinamento e chiude dropdown
  const handleSort = (order) => {
    setSortOrder(order);
    setIsSortOpen(false);
  };

  // Se c'è una categoria nell'URL, viene impostata automaticamente nello stato
  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory]);

  // Calcolo delle destinazioni filtrate e ordinate
  const filteredDestinations = useMemo(() => {
    if (!allDestinations) return [];
    // Prima filtro in base a categoria e ricerca
    let filtered = allDestinations.filter((d) => {
      // Se non c'è ricerca né categoria, mostra tutto
      if (!debouncedSearch && !category) return true;
      // Filtro per categoria
      if (category) {
        if (d.category.toLowerCase() !== category.toLowerCase()) return false;
      }
      // Filtro per ricerca
      if (debouncedSearch) {
        const searchTerm = debouncedSearch.toLowerCase().trim();
        if (!d.title.toLowerCase().includes(searchTerm)) return false;
      }
      return true; // se passa i controlli, rimane
    });
    // Ordinamento alfabetico basato su sortOrder
    return filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }, [allDestinations, debouncedSearch, category, sortOrder]);

  // Mostra loading se le destinazioni non sono ancora disponibili
  if (!allDestinations) return <div>Loading...</div>;

  //estraggo ogni categoria per evitare che ci siano duplicati nel dropdown
  const uniqueCategories = useMemo(() => {
    if (!allDestinations) return [];

    const categories = [];
    allDestinations.forEach((d) => {
      if (!categories.includes(d.category)) {
        categories.push(d.category);
      }
    });
    return categories;
  }, [allDestinations]);

  // Quando clicco su una categoria, aggiorno lo stato e chiudo il dropdown
  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsCategoryOpen(false);
  };
  return (
    <>
      <div className="lux-filters">
        <div className="filters-group">
          <input
            type="text"
            placeholder="Search destination..."
            className="lux-search-input"
            value={searchTerm}
            onChange={handleSearch}
          />

          <div className="lux-dropdown">
            <button className="lux-btn" onClick={toggleCategoryDropDown}>
              Category
            </button>
            {isCategoryOpen && (
              <ul className="lux-dropdown-menu">
                <li>
                  <button
                    className="lux-dropdown-item"
                    onClick={() => handleCategory("")}
                  >
                    All categories
                  </button>
                </li>
                {uniqueCategories.map((c) => (
                  <li key={c}>
                    <button
                      className="lux-dropdown-item"
                      onClick={() => handleCategory(c)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lux-dropdown">
            <button className="lux-btn" onClick={toggleSortDropDown}>
              Sort by
            </button>
            {isSortOpen && (
              <ul className="lux-dropdown-menu">
                <li>
                  <button
                    className="lux-dropdown-item"
                    onClick={() => handleSort("asc")}
                  >
                    A-Z
                  </button>
                </li>
                <li>
                  <button
                    className="lux-dropdown-item"
                    onClick={() => handleSort("desc")}
                  >
                    Z-A
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <CompareButton />
      </div>

      {/* CARDS */}
      <div className="lux-cards-container ">
        {filteredDestinations && filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <div className=" d-flex lux-card-wrapper" key={destination.id}>
              <Card destination={destination} />
            </div>
          ))
        ) : (
          <p
            className="lux-empty"
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No destination found
          </p>
        )}
      </div>
    </>
  );
}
