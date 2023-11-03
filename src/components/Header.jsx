import React, { useEffect, useState } from "react";
import "../css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import { Button, Drawer, List, ListItem, ListItemText, Menu, SpeedDial, SpeedDialAction, useMediaQuery } from "@mui/material";
import { Home, Person, Star, TrendingUp } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 1023px)");

  const goHome = () => {
    navigate("/");
  };

  const goTrending = () => {
    navigate("/trending");
  };

  const goMovies = () => {
    navigate("/resultspage");
  };

  const goPeople = () => {
    navigate("/people");
  };

  const goDiscover = () => {
    navigate("/discover");
  };

  const handleSearch = (e) => {
    // e.stopPropagation()
    setDrawerOpen(false)
    if (searchValue !== "") {
      const query = encodeURIComponent(searchValue);
      navigate(`/search/${query}/${query}`);
    }
    // Assuming searchValue contains the query
    // const query = encodeURIComponent(searchValue);
  
    // Construct the URL using the /movie/:id/:title/:name pattern
    // navigate(`/search/${query}/${query}`);
  };

  const handleKeyPress = (e) => {
    if ((searchValue !== "") && (e.key === "Enter")) {
      handleSearch();
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    // handleKeyPress();
  }, [isSmallScreen])

  console.log(searchValue);

  return (
    <div className="header">
      <header className="main__header">
        <div className="header__container">
          {isSmallScreen ? (
            <MenuIcon onClick={toggleDrawer}>
          </MenuIcon>
          ) : (
            <></>
          )}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClick={() => setDrawerOpen(false)}
            onClose={() => setDrawerOpen(false)}
          >
            <List>
              <ListItem button onClick={goHome}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={goTrending}>
                <ListItemText primary="Trending" />
              </ListItem>
              <ListItem button onClick={goDiscover}>
                <ListItemText primary="Discover" />
              </ListItem>
              <ListItem button onClick={goPeople}>
                <ListItemText primary="People" />
              </ListItem>
              <ListItem>
                <div className="header__search">
                  <input
                    type="text"
                    placeholder="Search Movies & Shows..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Search
                    className="header__searchButton"
                    onClick={handleSearch}
                  />
                </div>
              </ListItem>
            </List>
          </Drawer>
          <div className="header__titleContainer">
            <h1 className="header__title" onClick={goHome}>
              MOVIENIGHT
            </h1>
          </div>
          <div className="header__subtitleContainer">
            <h3 className="header__subtitle" onClick={goHome}>
              Home
            </h3>
            <h3 className="header__subtitle" onClick={goTrending}>
              Trending
            </h3>
            <h3 className="header__subtitle" onClick={goDiscover}>
              Discover
            </h3>
            {/* <h3 className="header__subtitle" onClick={goMovies}>Movies</h3>
            <h3 className="header__subtitle">Shows</h3> */}
            <h3 className="header__subtitle" onClick={goPeople}>
              People
            </h3>
          </div>
        </div>
        <div className="header__searchContainer">
          <div className="header__search">
            <input
              type="text"
              placeholder="Search Movies & Shows..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Search className="header__searchButton" onClick={handleSearch} />
          </div>

          {/* <Button className="header__button">
        </Button> */}
          {/* <h3 className="header__login">Login</h3> */}
        </div>
      </header>
    </div>
  );
}
