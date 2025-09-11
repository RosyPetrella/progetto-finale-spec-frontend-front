import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <>
      <header className="lux-header">
        <div className="header-container">
          <Link to="/">
            <img
              src="/images/logo.png"
              className="header-logo"
              alt="Luxury Escape Logo"
            />
          </Link>

          <nav className="nav-links">
            <NavLink to="/presentation" className="nav-link">
              Our Philosophy
            </NavLink>
            <NavLink to="/destinationsList" className="nav-link">
              Destinations
            </NavLink>
            <NavLink to="/favourites" className="nav-link">
              Favourites
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}
