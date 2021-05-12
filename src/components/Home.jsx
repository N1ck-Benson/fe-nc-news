import React, { Component } from "react";
import { Router } from "@reach/router";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import { fetchArticles } from "../api";
import { Spinner, SpinnerSize } from "@blueprintjs/core";

class Home extends Component {
  state = {
    articlesByYear: [],
    topics: ["all"],
    isLoading: true,
    orderBy: "date",
  };

  componentDidMount() {
    const { topics, orderBy } = this.state;
    fetchArticles(topics, orderBy).then((articlesFromApi) => {
      const newFiltersToDisplay = this.getTopicsFromArticles(articlesFromApi);
      this.setState({
        articlesByYear: articlesFromApi,
        filtersToDisplay: newFiltersToDisplay,
        isLoading: false,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const newTopics = this.state.topics;
    const newOrderBy = this.state.orderBy;
    if (
      prevState.topics.join("") !== newTopics.join("") ||
      prevState.orderBy !== newOrderBy
    ) {
      fetchArticles(newTopics, newOrderBy).then((articlesFromApi) => {
        this.setState({
          articlesByYear: articlesFromApi,
        });
      });
    }
  }

  getTopicsFromArticles = (articlesByYear) => {
    const uniqueTopics = [];
    articlesByYear.forEach((yearOfArticles) => {
      const articlesFromYear = Object.values(yearOfArticles).flat();
      articlesFromYear.forEach((article) => {
        if (uniqueTopics.indexOf(article.topic) < 0) {
          uniqueTopics.push(article.topic);
        }
      });
    });
    return uniqueTopics;
  };

  updateTopics = (selectedTopics) => {
    this.setState((currentState) => {
      const { topics } = currentState;
      if (topics.join("") !== selectedTopics.join("")) {
        return { topics: selectedTopics };
      }
    });
  };

  updateSortBy = (event) => {
    const selection = event.target.name;
    if (this.state.orderBy !== selection) {
      this.setState({ orderBy: selection });
    }
  };

  render() {
    const { articlesByYear, isLoading, orderBy } = this.state;
    const dateButtonClass =
      orderBy === "date" ? "clickedButton" : "unclickedButton";
    const votesButtonClass =
      orderBy === "votes" ? "clickedButton" : "unclickedButton";

    return isLoading ? (
      <main>
        <Spinner size={SpinnerSize.STANDARD} />
      </main>
    ) : (
      <main>
        <Router>
          <Topics
            path="/topics"
            getTopicsFromArticles={this.getTopicsFromArticles}
            updateTopics={this.updateTopics}
            articlesByYear={articlesByYear}
          />
        </Router>
        {articlesByYear.map((year) => {
          const sectionYear = Object.keys(year)[0];
          const articles = Object.values(year)[0];
          return (
            <section
              className="articles-section"
              key={`${sectionYear}-section`}
            >
              <header className="articles-header">
                <h2>{sectionYear}</h2>
                <nav>
                  Order by: &nbsp;
                  <button
                    className={dateButtonClass}
                    id="order-by-date"
                    name="date"
                    onClick={this.updateSortBy}
                  >
                    Date
                  </button>
                  <button
                    className={votesButtonClass}
                    id="order-by-votes"
                    name="votes"
                    onClick={this.updateSortBy}
                  >
                    Votes
                  </button>
                </nav>
              </header>
              <section className="article-cards">
                {articles.map((article) => {
                  return (
                    <ArticleCard article={article} key={article.article_id} />
                  );
                })}
              </section>
            </section>
          );
        })}
      </main>
    );
  }
}

export default Home;
