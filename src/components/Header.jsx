import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <>
      <header>
        <div className="d-flex flex-row justify-content-around align-items-center">
          <Link to={"/"}>
            <img src="/images/logo.png" className="headerLogo" alt="logo" />
          </Link>
          <h3>Destinations</h3>
          <h3>Our company</h3>
          <h3>Favourites</h3>
        </div>
      </header>
    </>
  );
}
