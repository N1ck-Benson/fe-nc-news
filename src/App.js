import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";
import { Link } from "@reach/router";
import "./App.css";

const App = () => {
  return (
    <main className="app">
      <header>
        <Link to="/home" className="header-link">
          <h1>NC News</h1>
        </Link>
        <nav>
          <Link to="/home" className="header-link">
            Home
          </Link>
          <Link to="/home/topics" className="header-link">
            Topics
          </Link>
        </nav>
      </header>
      <Router>
        <Home path="home/*" />
        <ArticlePage path="articles/:article_id" />
      </Router>
    </main>
  );
};

export default App;
