import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeoplePage from "./components/PeoplePage";
import TrendingPage from "./components/TrendingPage";
import Upcomingpage from "./components/UpcomingPage";
import TopRatedPage from "./components/TopRatedPage";
import PopularPage from "./components/PopularPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import SearchPage from "./components/SearchPage";
import DiscoverPage from "./components/DiscoverPage";
import PeopleDetailsPage from "./components/PeopleDetailsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/trending" element={<TrendingPage />}></Route>
          <Route path="/discover" element={<DiscoverPage />}></Route>
          <Route path="/people" element={<PeoplePage />}></Route>
          <Route path="/upcoming" element={<Upcomingpage />}></Route>
          <Route path="/toprated" element={<TopRatedPage />}></Route>
          <Route path="/popular" element={<PopularPage />}></Route>
          <Route path="/:type/:id/:title" element={<MovieDetailsPage />} />
          <Route path="/person/:id?" element={<PeopleDetailsPage />} />
          <Route path="/search/:query?" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
