import { useState } from "react";

export default function Homepage() {
  return (
    <>
      {/* HERO */}
      <div class="px-4 py-5 my-5 text-center">
        {" "}
        <img
          class="d-block mx-auto mb-4"
          src="/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"
        />{" "}
        <h1 class="display-5 fw-bold text-body-emphasis">Centered hero</h1>{" "}
        <div class="col-lg-6 mx-auto">
          {" "}
          <p class="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>{" "}
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {" "}
            <button type="button" class="btn btn-primary btn-lg px-4 gap-3">
              Primary button
            </button>{" "}
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">
              Secondary
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      {/* CAROUSEL */}
      <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
        {" "}
        <div class="carousel-indicators">
          {" "}
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            class="active"
            aria-label="Slide 1"
            aria-current="true"
          ></button>{" "}
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            class=""
          ></button>{" "}
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            class=""
          ></button>{" "}
        </div>{" "}
        <div class="carousel-inner">
          {" "}
          <div class="carousel-item active">
            {" "}
            <svg
              aria-hidden="true"
              class="bd-placeholder-img "
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              ></rect>
            </svg>{" "}
            <div class="container">
              {" "}
              <div class="carousel-caption text-start">
                {" "}
                <h1>Example headline.</h1>{" "}
                <p class="opacity-75">
                  Some representative placeholder content for the first slide of
                  the carousel.
                </p>{" "}
                <p>
                  <a class="btn btn-lg btn-primary" href="#">
                    Sign up today
                  </a>
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div class="carousel-item">
            {" "}
            <svg
              aria-hidden="true"
              class="bd-placeholder-img "
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              ></rect>
            </svg>{" "}
            <div class="container">
              {" "}
              <div class="carousel-caption">
                {" "}
                <h1>Another example headline.</h1>{" "}
                <p>
                  Some representative placeholder content for the second slide
                  of the carousel.
                </p>{" "}
                <p>
                  <a class="btn btn-lg btn-primary" href="#">
                    Learn more
                  </a>
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div class="carousel-item">
            {" "}
            <svg
              aria-hidden="true"
              class="bd-placeholder-img "
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              ></rect>
            </svg>{" "}
            <div class="container">
              {" "}
              <div class="carousel-caption text-end">
                {" "}
                <h1>One more for good measure.</h1>{" "}
                <p>
                  Some representative placeholder content for the third slide of
                  this carousel.
                </p>{" "}
                <p>
                  <a class="btn btn-lg btn-primary" href="#">
                    Browse gallery
                  </a>
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          {" "}
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>{" "}
          <span class="visually-hidden">Previous</span>{" "}
        </button>{" "}
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          {" "}
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
          ></span>{" "}
          <span class="visually-hidden">Next</span>{" "}
        </button>{" "}
      </div>
    </>
  );
}
