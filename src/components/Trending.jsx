import { Star } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/Trending.css";

export default function Trending() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [subset, setSubset] = useState([]);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 1184px)");

  const itemsPerPage = 20;

  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaType);
  const prevMediaType = useSelector((state) => state.prevMediaType);

  const IMG_API = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";

  async function getTrending(pageNumber) {
    let apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${pageNumber}`;

    if (mediaType === "tv" || mediaType === "movie") {
      apiUrl = `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${API_KEY}&page=${pageNumber}`;
    } else if (mediaType === null && prevMediaType === "tv") {
      apiUrl = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&page=${pageNumber}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${pageNumber}`;
    }

    const { data } = await axios.get(apiUrl);

    const dataExtract = data.results;

    setData(dataExtract);
    if (isSmallScreen) {
      setSubset(dataExtract.slice(0, itemsPerPage));
    } else {
      setSubset(dataExtract.slice(0, itemsPerPage));
    }
  }

  useEffect(() => {
    getTrending(currentPage + 1);
  }, [currentPage, mediaType, isSmallScreen]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    const newStartIndex = selectedPage.selected * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;

    const newSubset = data.slice(newStartIndex, newEndIndex);

    setSubset(newSubset);
  };

  const handleMediaTypeToggle = (newMediaType) => {
    if (newMediaType !== mediaType) {
      dispatch({ type: "SET_MEDIA_TYPE", payload: newMediaType });
    }
  };

  return (
    <div className="trending">
      <div className="trending">
        <div className="trending__mainContainer">
          <div className="trending__innerContainer">
            <div className="trending__titleContainer">
              <div className="trending__sectionTitle">
                <h1>Trending</h1>
              </div>
              <ToggleButtonGroup
                value={mediaType}
                exclusive
                onChange={(event, newMediaType) =>
                  handleMediaTypeToggle(newMediaType)
                }
                className="trending__buttons"
              >
                <ToggleButton
                  value="movie"
                  aria-label="Movies"
                  className={
                    mediaType === "movie" ||
                    (mediaType === "movie" && prevMediaType === "tv") ||
                    (mediaType === "movie" && prevMediaType === null) ||
                    (mediaType === null && prevMediaType === "movie")
                      ? "selectedButton"
                      : "customToggleButton"
                  }
                >
                  Movies
                </ToggleButton>
                <ToggleButton
                  value="tv"
                  aria-label="TV Shows"
                  className={
                    mediaType === "tv" ||
                    (mediaType === "tv" && prevMediaType === "movie") ||
                    (mediaType === "tv" && prevMediaType === null) ||
                    (mediaType === null && prevMediaType === "tv")
                      ? "selectedButton"
                      : "customToggleButton"
                  }
                >
                  TV Shows
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="trending__cards">
              {subset && subset.length > 0 ? (
                subset.map((movie) => (
                  <div className="trending__card" key={movie.id}>
                    {movie && movie.poster_path ? (
                      <div className="trending__cardImg">
                        <img
                          src={IMG_API + movie.poster_path}
                          alt=""
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
                        />
                        <p className="trending__upcomingRating">
                          <Star />
                          <span className="trending__upcomingRate">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="movieDetails__cardImgBlank"></div>
                    )}
                    <div className="trending__cardName">
                      {mediaType === "movie" ||
                      (mediaType === null && prevMediaType === "movie") ? (
                        <>
                          <h3 className="trending__cardTitle">{movie.title}</h3>
                          <h3 className="trending__cardDate">
                            {movie.release_date}
                          </h3>
                        </>
                      ) : (
                        <>
                          <h3 className="trending__cardTitle">{movie.name}</h3>
                          <h3 className="trending__cardDate">
                            {movie.first_air_date}
                          </h3>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="trending__notLoaded">
                  <h3>No trending found.</h3>
                </div>
              )}
            </div>
            <ReactPaginate
              pageCount={Math.ceil(500)}
              onPageChange={handlePageChange}
              forcePage={currentPage}
              previousLabel="Prev"
              nextLabel="Next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              marginPagesDisplayed={3}
              pageRangeDisplayed={3}
              containerClassName="pagination"
              activeLinkClassName="active"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
