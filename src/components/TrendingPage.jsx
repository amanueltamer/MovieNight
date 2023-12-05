import React from "react";
import Header from "./Header";
import Trending from "./Trending";
import Footer from "./Footer";

export default function TrendingPage() {
  return (
    <div className="trending__page">
      <Header />
      <Trending />
      <Footer />
    </div>
  );
}
