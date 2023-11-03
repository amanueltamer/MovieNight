import React from "react";
import "../css/Home.css";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";
import Movies from "./Movies";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <Movies />
      <Categories />
      <Footer />
    </div>
  );
}
