import { useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "../css/People.css";

const People = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [subset, setSubset] = useState([]);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 2px)");

  const itemsPerPage = 20;

  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";
  const IMG_API = "https://image.tmdb.org/t/p/original/";

  async function getPeople(pageNumber) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${pageNumber}`
    );

    const dataExtract = data.results;

    setData(dataExtract);
    if (isSmallScreen) {
      setSubset(dataExtract.slice(0, itemsPerPage - 11));
    } else {
      setSubset(dataExtract.slice(0, itemsPerPage));
    }
  }

  useEffect(() => {
    getPeople(currentPage + 1);
  }, [currentPage, isSmallScreen]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    const newStartIndex = selectedPage.selected * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;

    const newSubset = data.slice(newStartIndex, newEndIndex);

    setSubset(newSubset);
  };

  return (
    <div className="people">
      <div className="people__mainContainer">
        <div className="people__innerContainer">
          <div className="people__sectionTitle">
            <h1>People</h1>
          </div>
          <div className="people__cards">
            {subset && subset.length > 0 ? (
              subset.map((movie) => (
                <div className="people__card" key={movie.id}>
                  {movie && movie.profile_path ? (
                    <div className="search__cardImg">
                      <img
                        src={IMG_API + movie.profile_path}
                        alt={movie.name}
                      />
                      {movie.profile_path &&
                        movie.known_for &&
                        movie.known_for.length > 0 && (
                          <div className="search__knownFor">
                            {movie.known_for.map((knownFor) => (
                              <img
                                key={knownFor.id}
                                src={IMG_API + knownFor.poster_path}
                                alt={knownFor.name || knownFor.title}
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
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="movieDetails__cardImgBlank"></div>
                  )}
                  <div className="people__cardName">
                    <h3>{movie.name}</h3>
                    <h2 className="search__cardNameActing">
                      {movie.gender === 1
                        ? "Actress"
                        : movie.gender === 2
                        ? "Actor"
                        : "Actor/Actress"}
                    </h2>
                  </div>
                </div>
              ))
            ) : (
              <div className="people__notLoaded">
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

export default People;
