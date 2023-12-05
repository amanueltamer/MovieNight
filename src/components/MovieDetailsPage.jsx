import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import MovieDetails from "./MovieDetails";

export default function () {
  return (
    <div className="movieDetailsPage">
      <Header />
      <MovieDetails />
      <Footer />
    </div>
  );
}
