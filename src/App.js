import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { Link } from "@reach/router";
import "./App.css";

const App = () => {
  const username = "Default";

  return (
    <main className="app">
      <Navbar fixedToTop="true">
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>NC News</NavbarHeading>
          <NavbarDivider />
          <Link to="/">
            <Button className={Classes.MINIMAL} icon="home" text="Home" />
          </Link>
          <Link to="/topics">
            <Button className={Classes.MINIMAL} icon="document" text="Topics" />
          </Link>
          <Button className={Classes.MINIMAL} icon="id-number" />
          {username ? (
            <span className="signed-in">
              Signed in as &nbsp;
              <span className="highlighted-text">{username}</span>
            </span>
          ) : (
            <span>Sign in</span>
          )}
        </NavbarGroup>
      </Navbar>
      <div className="header-space" />
      <Router>
        <Home path="/*" />
        <ArticlePage path="articles/:article_id" />
      </Router>
    </main>
  );
};

export default App;
