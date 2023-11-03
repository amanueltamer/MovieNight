import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/SearchResults.css";
import sleepImg from "../images/Sleep.svg"

//URL//`https://api.themoviedb.org/3/movie/popular?api_key=d6ed228d534be022d42faf1a2d1a9472`
//Popular/`https://api.themoviedb.org/3/movie/popular?api_key=d6ed228d534be022d42faf1a2d1a9472`
//Search/`https://api.themoviedb.org/3/search/keyword?api_key=d6ed228d534be022d42faf1a2d1a9472`

export default function SearchResults() {
  const [movies, setMovies] = useState([]);
  const IMG_API="https://image.tmdb.org/t/p/w500/";

  async function getMovies(searchValue = "Karate Kid") {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=d6ed228d534be022d42faf1a2d1a9472&query=${searchValue}`
    );

    const dataExtract = data.results;

    console.log(dataExtract)

    const limitedMovies = dataExtract ? dataExtract.slice(0, 6) : [];

    setMovies(limitedMovies);
    console.log(data.results);
  }

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  return (
    <div className="search__results">
      {/* <h2 className="searchResults__movieTitle">Search Results for {movies.Title}</h2> */}
      <div className="searchResults__parentContainer">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="searchResults__container">
              <div className="searchResults__movieContainer">
                <div className="searchResults__movieImg">
                  <img src={IMG_API + movie.poster_path} alt={movie.title} />
                </div>
                <h2 style={{ color: 'white',}}>{movie.title}</h2>
              </div>
            </div>
          ))
        ) : (
          <div className="searchResults__noMoviesContainer">
          <p className="searchResults__noMovies">No movies found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
