import { Star } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "../css/TopRated.css";

const TopRated = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [subset, setSubset] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 20;

  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";
  const IMG_API = "https://image.tmdb.org/t/p/original/";

  async function getTopRated(pageNumber) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${pageNumber}`
    );

    const dataExtract = data.results;

    setData(dataExtract);
    setTotalPages(data.total_pages);
    setSubset(dataExtract.slice(0, itemsPerPage));
  }

  useEffect(() => {
    getTopRated(currentPage + 1);
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    const newStartIndex = selectedPage.selected * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;

    const newSubset = data.slice(newStartIndex, newEndIndex);

    setSubset(newSubset);
  };

  const handleCardClick = (movie) => {
    if (movie.title) {
      navigate(`/movie/${movie.id}/${encodeURIComponent(movie.title)}`);
    } else if (movie.name) {
      navigate(`/show/${movie.id}/${encodeURIComponent(movie.name)}`);
    }
  };

  return (
    <div className="topRated">
      <div className="topRated__mainContainer">
        <div className="topRated__innerContainer">
          <div className="topRated__sectionTitle">
            <h1>Top Rated Movies</h1>
          </div>
          <div className="topRated__cards">
            {subset && subset.length > 0 ? (
              subset.map((movie) => (
                <div className="topRated__card" key={movie.id}>
                  {movie && movie.poster_path ? (
                    <div className="topRated__cardImg">
                      <img
                        src={IMG_API + movie.poster_path}
                        alt={movie.name}
                        onClick={() => handleCardClick(movie)}
                      />
                      <p className="topRated__upcomingRating">
                        <Star />
                        <span className="topRated__upcomingRate">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="movieDetails__cardImgBlank"></div>
                  )}
                  <div className="topRated__cardName">
                    <h3 className="topRated__cardTitle">{movie.title}</h3>
                    <h3 className="topRated__cardDate">{movie.release_date}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="topRated__notLoaded">
                <h3>No topRated found.</h3>
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
  );
};

export default TopRated;
