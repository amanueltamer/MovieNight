import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import PeopleDetails from "./PeopleDetails";

export default function PeopleDetailsPage() {
  return (
    <div className="peopleDetailsPage">
      <Header />
      <PeopleDetails />
      <Footer />
    </div>
  );
}
