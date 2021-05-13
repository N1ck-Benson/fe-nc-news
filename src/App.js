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
  return (
    <main className="app">
      <Navbar fixedToTop="true">
        <NavbarGroup align={Alignment.CENTER}>
          <NavbarHeading>NC News</NavbarHeading>
          <NavbarDivider />
          <Link to="/">
            <Button className={Classes.MINIMAL} icon="home" text="Home" />
          </Link>
          <Link to="/topics">
            <Button className={Classes.MINIMAL} icon="document" text="Topics" />
          </Link>
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
