import React, { Component } from 'react';
import ArticlesHeader from './ArticlesHeader';
import ArticleCards from './ArticleCards';
import "../App.css";

class ArticlesSection extends Component {
  state = {
    articles: [
      // test article, not dynamic
      {
        author: "j_doe",
        title: "Life and times of John Doe",
        article_id: 1235,
        body: "He came, he saw, he conquered.",
        topic: "Does",
        created_at: "2020-11-15T12:21:54.171Z",
        votes: 34,
        comment_count: 13,
      },
      {
        author: "Shakespeare",
        title: "MacBeth",
        article_id: 1235,
        body: "He came, he saw, he conquered.",
        topic: "Does",
        created_at: "2019-11-15T12:21:54.171Z",
        votes: 34,
        comment_count: 13,
      },
      {
        author: "Darwin",
        title: "Origin of Species",
        article_id: 1235,
        body: "He came, he saw, he conquered.",
        topic: "Does",
        created_at: "2018-11-15T12:21:54.171Z",
        votes: 34,
        comment_count: 13,
      },
    ],
  };

  render() {
    const { sectionYear } = this.props;
    const { articles } = this.state;

    return (
      <section className="articles-section">
        <ArticlesHeader sectionYear={sectionYear} />
        <ArticleCards sectionYear={sectionYear} articles={articles} />
      </section>
    );
  }
}

export default ArticlesSection;