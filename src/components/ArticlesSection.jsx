import React from 'react';
import ArticleCard from "./ArticleCard";
import "../App.css";

const ArticlesSection = (props) => {
  const sectionYear = Object.keys(props.articlesObj)[0]
  const articles = Object.values(props.articlesObj)[0]
  const {key} = props

  return (
    <section className="articles-section" key={key}>
      <header className="articles-header">
        <h2>{sectionYear}</h2>
        <nav>Order by: [criteria]</nav>
      </header>
      <section className="article-cards">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </section>
    </section>
  );
};

export default ArticlesSection;