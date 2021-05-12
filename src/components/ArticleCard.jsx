import React from "react";
import { Link } from "@reach/router";

const ArticleCard = (props) => {
  const {
    article: { title, author, topic, article_id },
    key,
  } = props;
  return (
    <figure className="article-card" key={key}>
      <h4>{title}</h4>
      <p>
        <em>by</em> {author}
        <br />
        <em>in</em> {topic}
        <br />
      </p>
      <Link to={`/articles/${article_id}`}>👓</Link>
    </figure>
  );
};

export default ArticleCard;
