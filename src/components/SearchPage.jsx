import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";

export default function SearchPage() {
  return (
    <div className="searchPage">
      <Header />
      <Search />
      <Footer />
    </div>
  );
}
