import { Star } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Discover() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [subset, setSubset] = useState([]);
  const [selectedMovieValue, setSelectedMovieValue] = useState("28");
  const [selectedTvValue, setSelectedTvValue] = useState("10759");
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 1184px)");
  const { page } = useParams();

  const itemsPerPage = 20;

  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaType);
  const prevMediaType = useSelector((state) => state.prevMediaType);

  const IMG_API = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";

  async function getDiscover(pageNumber) {
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNumber}&with_genres=${selectedMovieValue}&include_adult=false`;

    if (mediaType === "tv" && selectedTvValue) {
      apiUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&page=${pageNumber}&with_genres=${selectedTvValue}&include_adult=false`;
    } else if (mediaType === "movie" && selectedMovieValue) {
      apiUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&page=${pageNumber}&with_genres=${selectedMovieValue}&include_adult=false`;
    } else if (mediaType === null && prevMediaType === "tv") {
      apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${pageNumber}&with_genres=${selectedTvValue}&include_adult=false`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNumber}&with_genres=${selectedMovieValue}&include_adult=false`;
    }

    try {
      const { data } = await axios.get(apiUrl);

      const dataSort = data.results.sort((a, b) => b.vote_count - a.vote_count);

      if (dataSort.length > 0) {
        setData(dataSort);
        const totalPagesToShow = Math.min(data.total_pages, 500);
        setTotalPages(totalPagesToShow);
        if (isSmallScreen) {
          setSubset(dataSort.slice(0, itemsPerPage));
        } else {
          setSubset(dataSort.slice(0, itemsPerPage));
        }
      } else {
        console.log("No data available for this page.");
      }
    } catch (error) {
      console.error("Error fetching discover data:", error);
    }
  }

  useEffect(() => {
    // Set currentPage to the page parameter from the URL
    setCurrentPage(page ? parseInt(page, 10) - 1 : 0);
  }, [page]);

  useEffect(() => {
    getDiscover(currentPage + 1);
  }, [
    currentPage,
    selectedMovieValue,
    selectedTvValue,
    mediaType,
    totalPages,
    isSmallScreen,
  ]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    const newStartIndex = selectedPage.selected * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;

    const newSubset = data.slice(newStartIndex, newEndIndex);

    setSubset(newSubset);

    // Update the URL with the new page number
    navigate(`/discover/${selectedPage.selected + 1}`);
  };

  const handleSelectChange = (event) => {
    if (mediaType === "movie") {
      setSelectedMovieValue(event.target.value);
      setCurrentPage(0);
    } else {
      setSelectedTvValue(event.target.value);
      setCurrentPage(0);
    }
  };

  const handleMediaTypeToggle = (newMediaType) => {
    if (newMediaType !== mediaType) {
      dispatch({ type: "SET_MEDIA_TYPE", payload: newMediaType });
      setCurrentPage(0);
    }
  };

  const handleCardClick = (movie) => {
    if (movie.title) {
      navigate(`/movie/${movie.id}/${encodeURIComponent(movie.title)}`);
    } else if (movie.name) {
      navigate(`/show/${movie.id}/${encodeURIComponent(movie.name)}`);
    }
  };

  return (
    <div className="trending">
      <div className="trending">
        <div className="trending__mainContainer">
          <div className="trending__innerContainer">
            <div className="trending__titleContainer">
              <div className="trending__sectionTitle">
                <h1>Discover</h1>
              </div>
              <div className="trending__buttonGroup">
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
                    onClick={() => navigate(`/discover/1`)}
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
                    onClick={() => navigate(`/discover/1`)}
                  >
                    TV Shows
                  </ToggleButton>
                </ToggleButtonGroup>
                {mediaType === "movie" ||
                (prevMediaType === "movie" && mediaType !== "tv") ? (
                  <Select
                    value={selectedMovieValue}
                    onChange={handleSelectChange}
                    label="Media Type"
                    variant="outlined"
                    className="trending__select"
                  >
                    <MenuItem value="28">Action</MenuItem>
                    <MenuItem value="12">Adventure</MenuItem>
                    <MenuItem value="16">Animation</MenuItem>
                    <MenuItem value="35">Comedy</MenuItem>
                    <MenuItem value="80">Crime</MenuItem>
                    <MenuItem value="99">Documentary</MenuItem>
                    <MenuItem value="18">Drama</MenuItem>
                    <MenuItem value="10751">Family</MenuItem>
                    <MenuItem value="14">Fantasy</MenuItem>
                    <MenuItem value="36">History</MenuItem>
                    <MenuItem value="27">Horror</MenuItem>
                    <MenuItem value="10402">Music</MenuItem>
                    <MenuItem value="9648">Mystery</MenuItem>
                    <MenuItem value="10749">Romance</MenuItem>
                    <MenuItem value="878">Science Fiction</MenuItem>
                    <MenuItem value="10770">Tv Movie</MenuItem>
                    <MenuItem value="53">Thriller</MenuItem>
                    <MenuItem value="10752">War</MenuItem>
                    <MenuItem value="37">Western</MenuItem>
                  </Select>
                ) : (
                  <Select
                    value={selectedTvValue}
                    onChange={handleSelectChange}
                    label="Media Type"
                    variant="outlined"
                    className="trending__select"
                  >
                    <MenuItem value="10759">Action & Adventure</MenuItem>
                    <MenuItem value="16">Animation</MenuItem>
                    <MenuItem value="35">Comedy</MenuItem>
                    <MenuItem value="80">Crime</MenuItem>
                    <MenuItem value="99">Documentary</MenuItem>
                    <MenuItem value="18">Drama</MenuItem>
                    <MenuItem value="10751">Family</MenuItem>
                    <MenuItem value="10762">Kids</MenuItem>
                    <MenuItem value="9648">Mystery</MenuItem>
                    <MenuItem value="10763">News</MenuItem>
                    <MenuItem value="10764">Reality</MenuItem>
                    <MenuItem value="10765">Sci-fi & Fantasy</MenuItem>
                    <MenuItem value="10766">Soap</MenuItem>
                    <MenuItem value="10767">Talk</MenuItem>
                    <MenuItem value="10768">War & Politics</MenuItem>
                    <MenuItem value="37">Western</MenuItem>
                  </Select>
                )}
              </div>
            </div>
            <div className="trending__cards">
              {subset && subset.length > 0 ? (
                subset.map((movie) => (
                  <div className="trending__card" key={movie.id}>
                    <div className="trending__cardImg">
                      {movie.poster_path ? (
                        <>
                          <img
                            src={IMG_API + movie.poster_path}
                            alt=""
                            onClick={() => handleCardClick(movie)}
                          />
                          <p className="trending__upcomingRating">
                            <Star />
                            <span className="trending__upcomingRate">
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </p>
                        </>
                      ) : (
                        <div className="movieDetails__cardImgBlank"></div>
                      )}
                    </div>

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
              pageCount={totalPages}
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
