import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="lux-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Luxury Escape</h3>
          <p>Crafting extraordinary journeys for exceptional travelers.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/presentation">Our Philosophy</Link>
          <Link to="/destinationsList">Destinations</Link>
        </div>

        <div className="footer-socials">
          <Link to="/" aria-label="Instagram" alt="instagram">
            📷 Instagram
          </Link>
          <Link to="/" aria-label="Facebook" alt="facebook">
            📘 Facebook
          </Link>
          <Link to="/" aria-label="Twitter" alt="twitter">
            🐦 Twitter
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Luxury Escape. All rights reserved.</p>
      </div>
    </footer>
  );
}
