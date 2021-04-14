import React from 'react';
import {Router} from '@reach/router';
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";

const Home = (props) => {
  const { filtersToDisplay, articlesByYear, loadingClass, updateTopics, updateSortBy } = props;
  return (
    <main>
      <Router>
        <Topics
          path="/topics"
          filtersToDisplay={filtersToDisplay}
          updateTopics={updateTopics}
        />
      </Router>
      <div className={loadingClass}>Loading articles...</div>
      {articlesByYear.map((year) => {
        const sectionYear = Object.keys(year)[0];
        const articles = Object.values(year)[0];
        return (
          // <ArticlesSection
          //   articlesObj={year} updateSortBy={updateSortBy} key={Object.keys(year).join("")}
          // />
          <section className="articles-section" key={`${sectionYear}-section`}>
            <header className="articles-header">
              <h2>{sectionYear}</h2>
              <nav>
                Order by:
                <button onClick={updateSortBy}>Topics</button>
                <button>Votes</button>
              </nav>
            </header>
            <section className="article-cards">
              {articles.map((article) => {
                return <ArticleCard article={article} key={article.article_id} />;
              })}
            </section>
          </section>
        );
      })}
    </main>
  );
};

export default Home;