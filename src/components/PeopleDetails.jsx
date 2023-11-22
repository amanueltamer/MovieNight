import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, EffectFade } from "swiper/core";
import "swiper/swiper-bundle.min.css";
import { useMediaQuery } from "@mui/material";

export default function PeopleDetails() {
  const navigate = useNavigate();
  const IMG_API = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "d6ed228d534be022d42faf1a2d1a9472";
  const maxLength = 20;
  const swiperRef = useRef(null);
  const { id } = useParams();
  const [personDetails, setPersonDetails] = useState();
  const [personMovieDetails, setPersonMovieDetails] = useState();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  async function getPeopleDetails() {
    const apiUrl = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`;
    try {
      const { data } = await axios.get(apiUrl);
      setPersonDetails(data);
    } catch (error) {
      console.error("Error fetching person details:", error);
    }
  }

  async function getPeopleMovieDetails() {
    const apiUrl = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}`;
    try {
      const { data } = await axios.get(apiUrl);
  
      // Sort the movies by popularity in descending order
      const sortedMovies = data.cast.sort((a, b) => b.popularity - a.popularity);
  
      // Use a set to keep track of unique movie IDs
      const uniqueMovieIds = new Set();
  
      // Filter out duplicates and movies where the character includes "Self", and get the top 12 movies
      const top12Movies = sortedMovies.filter(movie => {
        if (
          !uniqueMovieIds.has(movie.id) &&
          !movie.character.toLowerCase().includes("self")
        ) {
          uniqueMovieIds.add(movie.id);
          return true;
        }
        return false;
      }).slice(0, 12);
  
      setPersonMovieDetails(top12Movies);
    } catch (error) {
      console.error("Error fetching person movie details:", error);
    }
  }
  
  

  useEffect(() => {
    getPeopleDetails();
    getPeopleMovieDetails();
    // setPersonMovieDetails(personMovieDetails?.cast.slice(0, 20))
  }, [id, isSmallScreen]);

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
      delay: 1500,
    },
    loop: true,
    onInit: (swiper) => {
      swiperRef.current = swiper;
    },
  };

  console.log(personDetails);
  console.log(personDetails?.name);
  console.log(personMovieDetails?.cast);
  console.log(personMovieDetails)

  function extractFirstFourSentences(text) {
    // Use a regular expression to split the text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g);

    // Take the first four sentences
    const firstFourSentences = sentences ? sentences.slice(0, 4).join(" ") : "";

    return firstFourSentences;
  }

  return (
    <div className="people__details">
      {personMovieDetails ? (
        <Swiper {...settings} navigation rewind>
          {personMovieDetails.map((castMember) => (
            <SwiperSlide key={castMember.id}>
              <div
                className="movies__background"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.89) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.9) 100%), url(${
                      IMG_API + castMember.backdrop_path
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    ...(isSmallScreen
                      ? { backgroundImage:  `linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%), url(${
                        IMG_API + castMember.backdrop_path
                      })`} // Small screen background image
                      : {} // No additional styles for larger screens
                    ),
                  }}
                  
              >
                {personDetails ? (
                  <div className="movies__container">
                    <div className="movies__info">
                      <div className="movies__title">
                        <h3>{personDetails?.name}</h3>
                      </div>
                      <div className="movies__plot">
                        {personDetails?.biography ? (
                          <h3>
                            {extractFirstFourSentences(
                              personDetails?.biography
                            )}
                          </h3>
                        ) : (
                          <h3>No Biography Available.</h3>
                        )}
                      </div>
                    </div>
                    <div className="movies__poster">
                      <img
                        src={IMG_API + personDetails?.profile_path}
                        alt={personDetails?.name}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="movies__noMoviesContainer">
                    <p className="movies__noMovies">No person found.</p>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="movies__noMoviesContainer">
          <p className="movies__noMovies">No movies found.</p>
        </div>
      )}

      <div className="movieDetails__CastAndInfoContainer">
      <div className="movieDetails__castAndInfo">
        <div className="movieDetails__castAndInfoSpacer">
          <div className="movieDetails__cast">
            <h2>Roles and Credits</h2>
            <div className="movieDetails__castContainer">
              {personMovieDetails ? (
                personMovieDetails.map((movie) => (
                  <div className="movieDetails__card" key={movie.id}>
                    {movie && movie.poster_path ? (
                      <div className="movieDetails__cardImg" key={movie.id}>
                        <img
                          src={IMG_API + movie.poster_path}
                          alt={movie.title || movie.name}
                          onClick={() => {
                            if (movie.title) {
                              navigate(`/movie/${movie.id}/${movie.title}`);
                            } else if (movie.name) {
                              navigate(`/show/${movie.id}/${movie.name}`);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="movieDetails__cardImgBlank"></div>
                    )}

                    <div className="movieDetails__cardName">
                      <h3>{movie && (movie.title || movie.name)}</h3>
                    </div>
                    <div className="movieDetails__cardCharacter">
                      <h3>{movie && movie.character}</h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="movieDetails__notLoaded">
                  <h3>No people found.</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}