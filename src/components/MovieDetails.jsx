import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "@mui/icons-material";
import "../css/MovieDetails.css";
import { useMediaQuery } from "@mui/material";

export default function MovieDetails() {
  const { type, id, title } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [castDetails, setCastDetails] = useState(null);
  const [tvDetails, setTvDetails] = useState(null);
  const [castTvDetails, setCastTvDetails] = useState(null);
  const [titleSet, setTitleSet] = useState("");
  const [nameSet, setNameSet] = useState("");
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const IMG_API = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";

  async function getMovieDetails() {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    try {
      const { data } = await axios.get(apiUrl);
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  async function getCastDetails() {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    try {
      const { data } = await axios.get(apiUrl);
      setCastDetails(data.cast.slice(0, 12));
    } catch (error) {
      console.error("Error fetching cast details:", error);
    }
  }

  async function getTvDetails() {
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
    try {
      const { data } = await axios.get(apiUrl);
      setTvDetails(data);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    }
  }

  async function getCastTvDetails() {
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${API_KEY}`;
    try {
      const { data } = await axios.get(apiUrl);
      setCastTvDetails(data.cast.slice(0, 12));
    } catch (error) {
      console.error("Error fetching TV show cast details:", error);
    }
  }

  useEffect(() => {
    if (type === "movie") {
      getMovieDetails();
      getCastDetails();
    } else {
      getTvDetails();
      getCastTvDetails();
    }
    setTitleSet(title);
  }, []);

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}min`;
    } else if (remainingMinutes === 0) {
      return `${hours}hr`;
    } else {
      return `${hours}hr ${remainingMinutes}min`;
    }
  }

  if (!movieDetails && !tvDetails) {
    return <div>Loading...</div>;
  } else if (title === undefined) {
    return <div>Loading...</div>;
  }

  if (nameSet !== tvDetails?.name) {
    setNameSet(tvDetails?.name);
  }

  const productionCompanies =
    nameSet === tvDetails?.name && titleSet === movieDetails?.title
      ? (movieDetails && movieDetails.production_companies) || []
      : (tvDetails && tvDetails.production_companies) || [];

  function extractFirstFourSentences(text) {
    // Use a regular expression to split the text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g);

    // Take the first four sentences
    const firstFourSentences = sentences ? sentences.slice(0, 4).join(" ") : "";

    return firstFourSentences;
  }

  return (
    <div className="movie__details" key={id}>
      <div
        className="movieDetails__background"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.89) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.9) 100%), url(${
            IMG_API +
            (nameSet === tvDetails?.name && titleSet === movieDetails?.title
              ? movieDetails && movieDetails.backdrop_path
              : tvDetails && tvDetails.backdrop_path)
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          ...(isSmallScreen
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%), url(${
                  IMG_API +
                  (nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? movieDetails && movieDetails.backdrop_path
                    : tvDetails && tvDetails.backdrop_path)
                })`,
              } // Small screen background image
            : {}), // No additional styles for larger screens
        }}
      >
        <div className="movieDetails__container">
          <div className="movieDetails__poster">
            <img
              src={
                IMG_API +
                (nameSet === tvDetails?.name && titleSet === movieDetails?.title
                  ? movieDetails && movieDetails.poster_path
                  : tvDetails && tvDetails.poster_path)
              }
              alt={
                nameSet === tvDetails?.name && titleSet === movieDetails?.title
                  ? movieDetails && movieDetails.title
                  : tvDetails && tvDetails.name
              }
            />
          </div>
          <div className="movieDetails__info">
            <div className="movieDetails__title">
              <h3>
                {nameSet === tvDetails?.name && titleSet === movieDetails?.title
                  ? movieDetails && movieDetails.title
                  : tvDetails && tvDetails.name}
              </h3>
            </div>
            <div className="movies__rating">
              <Star />
              <h3>
                {nameSet === tvDetails?.name && titleSet === movieDetails?.title
                  ? movieDetails && movieDetails.vote_average.toFixed(1)
                  : tvDetails && tvDetails.vote_average.toFixed(1)}
              </h3>
            </div>
            <div className="movieDetails__plot">
              <h3>
                {nameSet === tvDetails?.name && titleSet === movieDetails?.title
                  ? movieDetails &&
                    movieDetails.overview &&
                    extractFirstFourSentences(movieDetails.overview)
                  : tvDetails &&
                    tvDetails.overview &&
                    extractFirstFourSentences(tvDetails.overview)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="movieDetails__castAndInfo">
        <div className="movieDetails__castAndInfoSpacer">
          <div className="movieDetails__castAndInfoContainer">
            <div className="movieDetails__cast">
              <h2>THE CAST</h2>
              <div className="movieDetails__castContainer">
                {nameSet === tvDetails?.name &&
                titleSet === movieDetails?.title ? (
                  castDetails && castDetails.length > 0 ? (
                    castDetails.map((cast) => (
                      <div className="movieDetails__card" key={cast.id}>
                        {cast && cast.profile_path ? (
                          <div className="movieDetails__cardImg">
                            <img
                              src={IMG_API + cast.profile_path}
                              alt={cast.name}
                              onClick={() => navigate(`/person/${cast.id}`)}
                            />
                          </div>
                        ) : (
                          <div className="movieDetails__cardImgBlank"></div>
                        )}

                        <div className="movieDetails__cardName">
                          <h3>{cast && cast.name}</h3>
                        </div>
                        <div className="movieDetails__cardCharacter">
                          <h3>{cast && cast.character}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="movieDetails__notLoaded">
                      <h3>No people found.</h3>
                    </div>
                  )
                ) : castTvDetails ? (
                  castTvDetails.length > 0 ? (
                    castTvDetails.map((cast) => (
                      <div className="movieDetails__card" key={cast.id}>
                        {cast && cast.profile_path ? (
                          <div className="movieDetails__cardImg">
                            <img
                              src={IMG_API + cast.profile_path}
                              alt={cast.name}
                              onClick={() => navigate(`/person/${cast.id}`)}
                            />
                          </div>
                        ) : (
                          <div className="movieDetails__cardImgBlank"></div>
                        )}
                        <div className="movieDetails__cardName">
                          <h3>{cast && cast.name}</h3>
                        </div>
                        <div className="movieDetails__cardCharacter">
                          <h3>
                            {cast && cast.roles && cast.roles.length > 0
                              ? cast.roles[0].character !== ""
                                ? cast.roles[0].character
                                : "No character available"
                              : "No roles available"}
                          </h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="movieDetails__notLoaded">
                      <h3>No people found.</h3>
                    </div>
                  )
                ) : null}
              </div>
            </div>
            <div className="movieDetails__information">
              <h2>GENRES</h2>
              <div className="movieDetails__informationGenreBoxes">
                {nameSet === tvDetails?.name && titleSet === movieDetails?.title
                  ? (movieDetails?.genres || []).map((genre) => (
                      <p className="movieDetails__genreBox" key={genre.id}>
                        {genre.name}
                      </p>
                    ))
                  : (tvDetails?.genres || []).map((genre) => (
                      <p className="movieDetails__genreBox" key={genre.id}>
                        {genre.name}
                      </p>
                    ))}
              </div>

              <div className="movieDetails__generalInfo">
                <h2>RELEASE DATE</h2>
                <p>
                  {nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? movieDetails && movieDetails.release_date
                    : tvDetails && tvDetails.first_air_date}
                </p>
              </div>
              <div className="movieDetails__generalInfo">
                <h2>RATING</h2>
                <p>
                  {nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? movieDetails && movieDetails.vote_average.toFixed(1)
                    : tvDetails && tvDetails.vote_average.toFixed(1)}
                </p>
              </div>
              {nameSet === tvDetails?.name &&
              titleSet === movieDetails?.title ? (
                <div className="movieDetails__generalInfo">
                  <h2>REVENUE</h2>
                  <p>
                    {movieDetails && movieDetails.revenue
                      ? "$" + movieDetails.revenue.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              ) : tvDetails ? (
                <div className="movieDetails__generalInfo">
                  <h2>EPISODES</h2>
                  <p>
                    {tvDetails && tvDetails.number_of_episodes
                      ? tvDetails.number_of_episodes.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              ) : null}
              <div className="movieDetails__generalInfo">
                <h2>
                  {nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? "TAGLINE"
                    : "SEASONS"}
                </h2>
                <p>
                  {nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? movieDetails && movieDetails.tagline
                    : tvDetails && tvDetails.number_of_seasons}
                </p>
              </div>
              <div className="movieDetails__generalInfo">
                <h2>STATUS</h2>
                <p>
                  {nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? movieDetails && movieDetails.status
                    : tvDetails && tvDetails.status}
                </p>
              </div>
              <div className="movieDetails__generalInfo">
                <h2>
                  {nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? "RUNTIME"
                    : "EPISODE LENGTH"}
                </h2>
                <p>
                  {nameSet === tvDetails?.name &&
                  titleSet === movieDetails?.title
                    ? formatRuntime(
                        movieDetails && movieDetails.runtime
                          ? movieDetails.runtime
                          : 0
                      )
                    : formatRuntime(
                        tvDetails && tvDetails.episode_run_time
                          ? tvDetails.episode_run_time
                          : 0
                      )}
                </p>
              </div>
              <div className="movieDetails__generalInfo">
                <h2>PRODUCTION COMPANIES</h2>
                {productionCompanies.length > 0
                  ? productionCompanies.map((company) => (
                      <p key={company.id}>{company.name}</p>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
