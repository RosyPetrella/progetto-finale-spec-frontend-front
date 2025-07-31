import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <>
      <header>
        <div className="d-flex flex-row justify-content-around align-items-center">
          <Link to={"/"}>
            <img src="/images/logo.png" className="headerLogo" alt="logo" />
          </Link>
          <Link to={"/destinationsList"}>
            <h3>Destinations</h3>
          </Link>

          <h3>Our company</h3>
          <Link to={"/favourites"}>
            <h3>Favourites</h3>
          </Link>
        </div>
      </header>
    </>
  );
}
