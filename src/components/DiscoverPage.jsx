import React from "react";
import Discover from "./Discover";
import Footer from "./Footer";
import Header from "./Header";

export default function DiscoverPage() {
  return (
    <div className="discover__page">
      <Header />
      <Discover />
      <Footer />
    </div>
  );
}
