import React from 'react';
import {Router} from '@reach/router';
import ArticlesSection from "./ArticlesSection";
import Topics from "./Topics";

const Home = (props) => {
  const { filtersToDisplay, articlesByYear, loadingClass, updateTopics } = props;
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
        return (
          <ArticlesSection
            articlesObj={year}
            key={Object.keys(year).join("")}
          />
        );
      })}
    </main>
  );
};

export default Home;