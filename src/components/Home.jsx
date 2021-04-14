import React, { Component } from 'react';
import {Router} from '@reach/router';
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import { fetchArticles } from "../api";
import "../App.css";


class Home extends Component {

  state = {
    articlesByYear: [],
    topics: ["all"],
    isLoading: true,
  };

  componentDidMount() {
    const { topics } = this.state;
    fetchArticles(topics).then((articlesFromApi) => {
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
    if (prevState.topics.join("") !== newTopics.join("")) {
      fetchArticles(newTopics).then((articlesFromApi) => {
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

  updateSortBy = () => {};

  render() {
    const {
      articlesByYear,
      isLoading
    } = this.state;
    const loadingClass = isLoading ? "" : "isNotLoading";
    return (
      <main>
        <Router>
          <Topics
            path="/topics" getTopicsFromArticles={this.getTopicsFromArticles}
            updateTopics={this.updateTopics} articlesByYear={articlesByYear}
          />
        </Router>
        <div className={loadingClass}>Loading articles...</div>
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
                  Order by:
                  <button onClick={this.updateSortBy}>Topics</button>
                  <button>Votes</button>
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