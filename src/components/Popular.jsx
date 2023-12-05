import { Star } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "../css/Popular.css";

const Popular = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [subset, setSubset] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 20;

  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";
  const IMG_API = "https://image.tmdb.org/t/p/original/";

  async function getPopular(pageNumber) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`
    );

    const dataExtract = data.results;

    setData(dataExtract);
    setSubset(dataExtract.slice(0, itemsPerPage));
  }

  useEffect(() => {
    getPopular(currentPage + 1);
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    const newStartIndex = selectedPage.selected * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;

    const newSubset = data.slice(newStartIndex, newEndIndex);

    setSubset(newSubset);
  };

  return (
    <div className="popular">
      <div className="popular__mainContainer">
        <div className="popular__innerContainer">
          <div className="popular__sectionTitle">
            <h1>Popular Movies</h1>
          </div>
          <div className="popular__cards">
            {subset && subset.length > 0 ? (
              subset.map((movie) => (
                <div className="popular__card" key={movie.id}>
                  {movie && movie.poster_path ? (
                    <div className="popular__cardImg">
                      <img
                        src={IMG_API + movie.poster_path}
                        alt={movie.name}
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
                      <p className="popular__upcomingRating">
                        <Star />
                        <span className="popular__upcomingRate">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="movieDetails__cardImgBlank"></div>
                  )}
                  <div className="popular__cardName">
                    <h3 className="popular__cardTitle">{movie.title}</h3>
                    <h3 className="popular__cardDate">{movie.release_date}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="popular__notLoaded">
                <h3>No popular found.</h3>
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
  );
};

export default Popular;
