import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      {/* CAROUSEL */}
      <div
        id="myCarousel"
        className="carousel slide mb-6"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-label="Slide 1"
            aria-current="true"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className=""
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className=""
          ></button>
        </div>
        <div className="carousel-inner">
          {/* First Slide */}
          <div className="carousel-item active">
            <img
              src="/images/city.png"
              className="d-block w-100"
              alt="City"
              style={{ height: "600px", objectFit: "cover" }}
            />
            <div className="carousel-caption">
              <h1>Elite Urban Retreats</h1>
              <p>
                Experience the world's most exclusive city destinations in
                unparalleled luxury
              </p>
              <Link
                to="/destinationsList/City"
                className="btn btn-light btn-lg mt-3"
              >
                Explore Urban Destinations
              </Link>
            </div>
          </div>
          {/* Second Slide */}
          <div className="carousel-item">
            <img
              src="/images/beach.png"
              className="d-block w-100"
              alt="beach"
              style={{ height: "600px", objectFit: "cover" }}
            />
            <div className="carousel-caption">
              <h1>Private Paradise Escapes</h1>
              <p>
                Discover secluded beaches and pristine coastal havens reserved
                for the privileged few
              </p>
              <Link
                to="/destinationsList/Beach"
                className="btn btn-light btn-lg mt-3"
              >
                Discover Beach Retreats
              </Link>
            </div>
          </div>
          {/* Third Slide */}
          <div className="carousel-item">
            <img
              src="/images/avventura.png"
              className="d-block w-100"
              alt="adventure"
              style={{ height: "600px", objectFit: "cover" }}
            />
            <div className="carousel-caption">
              <h1>Bespoke Adventures</h1>
              <p>
                Embark on extraordinary journeys crafted for the sophisticated
                explorer
              </p>
              <Link
                to="/destinationsList/Adventure"
                className="btn btn-light btn-lg mt-3"
              >
                Start Your Adventure
              </Link>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* HERO */}
      <section className="lux-hero">
        <div className="hero-content">
          <h1 className="hero-title">LUXURY ESCAPES</h1>
          <p className="hero-subtitle">
            Discover tailor-made luxury travel experiences designed for
            discerning explorers. From private islands to curated city escapes,
            we craft unforgettable journeys with elegance, comfort, and
            exclusivity.
          </p>
          <div className="hero-actions">
            <Link to="presentation" className="hero-button">
              Our Philosophy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
