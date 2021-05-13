import React from "react";
import { Link } from "@reach/router";

const ArticleCard = (props) => {
  const {
    article: { title, author, topic, article_id, created_at, votes },
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
      <footer className="article-card-footer">
        <span className="vote-count">
          👏
          {votes}
        </span>
        <Link className="read-icon" to={`/articles/${article_id}`}>
          <img
            alt="Read"
            title="Read"
            src="https://cdn2.iconfinder.com/data/icons/mix-color-5/100/Mix_color_5__glasses-512.png"
          />
        </Link>
      </footer>
    </figure>
  );
};

export default ArticleCard;
