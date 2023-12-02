import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { useNavigate, useParams } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { query } = useParams();

  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  const goHome = () => {
    navigate("/");
  };

  const goTrending = () => {
    navigate("/trending");
  };

  const goPeople = () => {
    navigate("/people");
  };

  const goDiscover = () => {
    navigate("/discover");
  };

  const handleSearch = () => {
    setDrawerOpen(false);
    if (searchValue !== "") {
      const query = searchValue;
      navigate(`/search/${query}`);
    }
  };

  const handleKeyPress = (e) => {
    if (searchValue !== "" && e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // useEffect(() => {
  //   if (searchValue !== query) {
  //     setSearchValue("")
  //   }
  // }, [query]);

  useEffect(() => {}, [isSmallScreen]);

  return (
    <div className="header">
      <header className="main__header">
        <div className="header__container">
          {isSmallScreen ? <MenuIcon onClick={toggleDrawer}></MenuIcon> : <></>}
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
        </div>
      </header>
    </div>
  );
}
