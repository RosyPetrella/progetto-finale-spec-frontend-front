import { useState, useContext, useEffect } from "react";
import React from "react";
import Card from "../components/Card";
import { GlobalContext } from "../Context/context";
import CompareButton from "../components/CompareButton";
import useDebounce from "../hooks/useDebounce";
import { useParams } from "react-router-dom";

export default function DestinationsList() {
  const { allDestinations } = useContext(GlobalContext);
  const [category, setCategory] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { category: urlCategory } = useParams();

  const toggleSortDropDown = () => setIsSortOpen((prev) => !prev);
  const toggleCategoryDropDown = () => setIsCategoryOpen((prev) => !prev);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSort = (order) => {
    setSortOrder(order);
    setIsSortOpen(false);
  };

  useEffect(() => {
    // console.log("urlCategory received:", urlCategory);
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredDestinations = React.useMemo(() => {
    //log per verificare il debounce
    // console.log("Current debouncedSearch:", debouncedSearch);
    if (!allDestinations) return [];

    let filtered = allDestinations.filter((d) => {
      // Se non c'è ricerca né categoria, mostra tutto
      if (!debouncedSearch && !category) return true;

      // Controlla la categoria
      if (category) {
        if (d.category.toLowerCase() !== category.toLowerCase()) return false;
      }
      // Controlla la ricerca
      if (debouncedSearch) {
        const searchTerm = debouncedSearch.toLowerCase().trim();
        if (!d.title.toLowerCase().includes(searchTerm)) return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }, [allDestinations, debouncedSearch, category, sortOrder]);

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
          <p className="lux-empty">No destinations found</p>
        )}
      </div>
    </>
  );
}
