import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../css/Movies.css";
import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft, ArrowCircleRight, Star } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, EffectFade } from "swiper/core";
import "swiper/swiper-bundle.min.css";

export default function Movies() {
  const [movies, setMovies] = useState({});
  const navigate = useNavigate();
  const IMG_API = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";
  const maxLength = 200;

  const swiperRef = useRef(null);

  async function getMovies() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );

    const dataExtract = data.results;

    const limitedMovies = dataExtract ? dataExtract.slice(0, 6) : [];

    setMovies(limitedMovies);
  }

  useEffect(() => {
    getMovies();
  }, []);

  SwiperCore.use([Navigation, Autoplay, EffectFade]);

  const settings = {
    slidesPerView: 1,
    navigation: {
      nextEl: ".movies__nextButton",
      prevEl: ".movies__prevButton",
    },
    effect: "fade",
    speed: 800,
    easing: "ease-in-out",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 4000,
    },
    loop: true,
    onInit: (swiper) => {
      swiperRef.current = swiper;
    },
  };

  return (
    <div className="movies">
      {movies && movies.length > 0 ? (
        <Swiper {...settings} navigation rewind="true">
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="movies__background"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.89) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%), url(${
                    IMG_API + movie.backdrop_path
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                }}
              >
                <button
                  className="movies__prevButton"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <ArrowCircleLeft />
                </button>
                <div className="movies__container">
                  <div className="movies__info">
                    <div className="movies__title">
                      <h3>{movie.title}</h3>
                    </div>
                    <div className="movies__rating">
                      <Star />
                      <h3>{movie.vote_average.toFixed(1)}</h3>
                    </div>
                    <div className="movies__plot">
                      <h3>
                        {movie.overview.length > maxLength
                          ? movie.overview.slice(0, maxLength) + "..."
                          : movie.overview}
                      </h3>
                    </div>
                    <Button
                      className="movies__details"
                      onClick={() => {
                        if (movie.title) {
                          navigate(
                            `/movie/${movie.id}/${encodeURIComponent(
                              movie.title
                            )}`
                          );
                        } else if (movie.name) {
                          navigate(
                            `/show/${movie.id}/${encodeURIComponent(
                              movie.name
                            )}`
                          );
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                  <div className="movies__poster">
                    <img src={IMG_API + movie.poster_path} alt={movie.title} />
                  </div>
                </div>
                <button
                  className="movies__nextButton"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <ArrowCircleRight />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="movies__noMoviesContainer">
          <p className="movies__noMovies">No movies found.</p>
        </div>
      )}
    </div>
  );
}
