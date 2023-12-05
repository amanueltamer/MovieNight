import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import People from "./People";

export default function PeoplePage() {
  return (
    <div className="people__page">
      <Header />
      <People />
      <Footer />
    </div>
  );
}
