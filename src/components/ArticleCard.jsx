import React from "react";
import { Link } from "@reach/router";

const ArticleCard = (props) => {
  const {
    article: { title, author, topic, article_id, created_at },
    key,
  } = props;
  const createdAtTrimmed = created_at.slice(0, created_at.indexOf("T"));
  return (
    <figure className="article-card" key={key}>
      <h4>{title}</h4>
      <p>
        <em>by</em> {author}
        <br />
        <em>in</em> {topic}
        <br />
        {createdAtTrimmed}
      </p>
      <Link to={`/articles/${article_id}`}>👓</Link>
    </figure>
  );
};

export default ArticleCard;
