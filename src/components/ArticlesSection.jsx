import React from 'react';
import ArticlesHeader from './ArticlesHeader';
import ArticleCards from './ArticleCards';
import "../App.css";

const ArticlesSection = (props) => {
  const sectionYear = Object.keys(props.articlesObj)[0]
  const articles = Object.values(props.articlesObj)[0]
  const {key} = props

  return (
    <section className="articles-section" key={key}>
      <ArticlesHeader sectionYear={sectionYear} />
      <ArticleCards articles={articles} />
    </section>
  );
};

export default ArticlesSection;