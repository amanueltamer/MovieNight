import { Star } from "@mui/icons-material";
import { Button, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Categories.css";

export default function Categories() {
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [popularMovies, setPopularMovies] = useState({});
  const [topMovies, setTopMovies] = useState({});
  const navigate = useNavigate();
  const IMG_API = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";

  let limitedMovies;

  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const isSmallerScreen = useMediaQuery("(max-width: 768px)");

  async function getUpcomingMovies() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
    );

    const dataExtract = data.results;

    if (isSmallerScreen) {
      limitedMovies = dataExtract ? dataExtract.slice(0, 4) : [];
    } else if (isSmallScreen) {
      limitedMovies = dataExtract ? dataExtract.slice(0, 8) : [];
    } else {
      limitedMovies = dataExtract ? dataExtract.slice(0, 10) : [];
    }

    setUpcomingMovies(limitedMovies);
  }

  async function getPopularMovies() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    const dataExtract = data.results;

    if (isSmallerScreen) {
      limitedMovies = dataExtract ? dataExtract.slice(0, 4) : [];
    } else if (isSmallScreen) {
      limitedMovies = dataExtract ? dataExtract.slice(0, 8) : [];
    } else {
      limitedMovies = dataExtract ? dataExtract.slice(0, 10) : [];
    }

    setPopularMovies(limitedMovies);
  }

  async function getTopMovies() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    const dataExtract = data.results;

    if (isSmallerScreen) {
      limitedMovies = dataExtract ? dataExtract.slice(0, 4) : [];
    } else if (isSmallScreen) {
      limitedMovies = dataExtract ? dataExtract.slice(0, 8) : [];
    } else {
      limitedMovies = dataExtract ? dataExtract.slice(0, 10) : [];
    }

    setTopMovies(limitedMovies);
  }

  const handleViewAllUpcomingMovies = () => {
    navigate("/upcoming");
  };

  const handleViewAllPopularMovies = () => {
    navigate("/popular");
  };

  const handleViewAllTopRatedMovies = () => {
    navigate("/toprated");
  };

  useEffect(() => {
    getUpcomingMovies();
    getPopularMovies();
    getTopMovies();
  }, [isSmallScreen]);

  const handleCardClick = (movie) => {
    if (movie.title) {
      navigate(`/movie/${movie.id}/${encodeURIComponent(movie.title)}`);
    } else if (movie.name) {
      navigate(`/show/${movie.id}/${encodeURIComponent(movie.name)}`);
    }
  };

  return (
    <div className="categories">
      <div className="container">
        <div className="cat__upcoming">
          <h3>Upcoming Movies</h3>
        </div>
        <div className="categories__container">
          {upcomingMovies && upcomingMovies.length > 0 ? (
            upcomingMovies.map((movie) => (
              <div key={movie.id} className="cat__upcomingContainer">
                <div className="cat__upcomingImg">
                  <img
                    src={IMG_API + movie.poster_path}
                    alt={movie.title}
                    onClick={() => handleCardClick(movie)}
                  />
                  <p className="cat__upcomingRating">
                    <Star />
                    <span className="cat__upcomingRate">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </p>
                </div>
                <div className="cat__upcomingInfo">
                  <h3 className="cat__upcomingTitle">{movie.title}</h3>
                  <h3 className="cat__upcomingDate">{movie.release_date}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="cat__notLoaded">
              <h3>No movies found.</h3>
            </div>
          )}
        </div>
        <Button
          className="cat__viewMovies"
          onClick={handleViewAllUpcomingMovies}
        >
          View all upcoming movies
        </Button>
      </div>

      <div className="container">
        <div className="cat__upcoming">
          <h3>Popular Movies</h3>
        </div>
        <div className="categories__container">
          {popularMovies && popularMovies.length > 0 ? (
            popularMovies.map((movie) => (
              <div key={movie.id} className="cat__upcomingContainer">
                <div className="cat__upcomingImg">
                  <img
                    src={IMG_API + movie.poster_path}
                    alt={movie.title}
                    onClick={() => handleCardClick(movie)}
                  />
                  <p className="cat__upcomingRating">
                    <Star />
                    <span className="cat__upcomingRate">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </p>
                </div>
                <div className="cat__upcomingInfo">
                  <h3 className="cat__upcomingTitle">{movie.title}</h3>
                  <h3 className="cat__upcomingDate">{movie.release_date}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="cat__notLoaded">
              <h3>No movies found.</h3>
            </div>
          )}
        </div>
        <Button
          className="cat__viewMovies"
          onClick={handleViewAllPopularMovies}
        >
          View all popular movies
        </Button>
      </div>

      <div className="container">
        <div className="cat__upcoming">
          <h3>Top Rated Movies</h3>
        </div>
        <div className="categories__container">
          {topMovies && topMovies.length > 0 ? (
            topMovies.map((movie) => (
              <div key={movie.id} className="cat__upcomingContainer">
                <div className="cat__upcomingImg">
                  <img
                    src={IMG_API + movie.poster_path}
                    alt={movie.title}
                    onClick={() => handleCardClick(movie)}
                  />
                  <p className="cat__upcomingRating">
                    <Star />
                    <span className="cat__upcomingRate">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </p>
                </div>
                <div className="cat__upcomingInfo">
                  <h3 className="cat__upcomingTitle">{movie.title}</h3>
                  <h3 className="cat__upcomingDate">{movie.release_date}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="cat__notLoaded">
              <h3>No movies found.</h3>
            </div>
          )}
        </div>
        <Button
          className="cat__viewMovies"
          onClick={handleViewAllTopRatedMovies}
        >
          View all top rated movies
        </Button>
      </div>
    </div>
  );
}
