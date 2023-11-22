import { Star } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Search.css";

const Search = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [subset, setSubset] = useState([]);
  const { query } = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 20;

  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";
  const IMG_API = "https://image.tmdb.org/t/p/original/";

  async function getSearch(pageNumber) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&include_adult=false&query=${query}&page=${pageNumber}&media_type=person`
    );

    const filteredResults = data.results;

    setData(filteredResults);
    setSubset(filteredResults.slice(0, itemsPerPage));
  }

  useEffect(() => {
    getSearch(currentPage + 1);
  }, [currentPage, query]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    const newStartIndex = selectedPage.selected * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;

    const newSubset = data.slice(newStartIndex, newEndIndex);

    setSubset(newSubset);
  };

  console.log(subset)

  return (
    <div className="search">
      <div className="search__mainContainer">
        <div className="search__innerContainer">
          <div className="search__sectionTitle">
            <h1>Results for "{query}"</h1>
          </div>
          <div className="search__cards">
            {subset && subset.length > 0 ? (
              subset.map((movie) => (
                <div className="search__card" key={movie.id}>
                  {movie && (movie.poster_path || movie.profile_path) ? (
                    <div className="search__cardImg">
                      <img
                        src={
                          IMG_API + (movie.poster_path || movie.profile_path)
                        }
                        alt={movie.name}
                        onClick={() => {
                          if (!movie.profile_path) {
                            if (movie.title) {
                              navigate(`/movie/${movie.id}/${movie.title}`);
                            } else if (movie.name) {
                              navigate(`/show/${movie.id}/${movie.name}`);
                            }
                          }
                        }}
                      />
                      {movie.poster_path && (
                        <p className="search__upcomingRating">
                          <Star />
                          <span className="search__upcomingRate">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </p>
                      )}
                      {movie.profile_path &&
                        movie.known_for &&
                        movie.known_for.length > 0 && (
                          <div className="search__knownFor">
                            {movie.known_for.map((knownFor) => (
                              <img
                                key={knownFor.id}
                                src={IMG_API + knownFor.poster_path}
                                alt={knownFor.name}
                                onClick={() => {
                                  if (knownFor.title) {
                                    navigate(
                                      `/movie/${knownFor.id}/${knownFor.title}`
                                    );
                                  } else if (knownFor.name) {
                                    navigate(
                                      `/show/${knownFor.id}/${knownFor.name}`
                                    );
                                  }
                                }}
                              />
                            ))}
                            <p className="search__upcomingRating">
                              <span
                                className="search__upcomingRate"
                                onClick={() => navigate(`/person/${movie.id}`)}
                              >
                                <h4>Click for Actor Details</h4>
                              </span>
                            </p>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="movieDetails__cardImgBlank"></div>
                  )}

                  <div className="search__cardName">
                    <h3>{movie.name || movie.title}</h3>
                    {movie.profile_path ? (
                      <h2 className="search__cardNameActing">
                        {movie.gender === 1
                          ? "Actress"
                          : movie.gender === 2
                          ? "Actor"
                          : "Actor/Actress"}
                      </h2>
                    ) : (
                      <h2 className="search__cardNameDate">
                        {movie.release_date || movie.first_air_date}
                      </h2>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="search__notLoaded">
                <h3>No people found.</h3>
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

export default Search;
