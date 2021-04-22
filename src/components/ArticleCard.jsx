import React, { Component } from "react";
import { Link } from "@reach/router";
import { incrementVotes } from "../api";

class ArticleCard extends Component {
  state = {
    newVotes: 0,
  };

  handleClick = (event) => {
    const { id } = event.target;
    incrementVotes(id);
    this.setState((currentState) => {
      return { newVotes: currentState.newVotes + 1 };
    });
  };

  render() {
    const {
      article: { title, author, topic, votes, article_id, comment_count },
      key,
    } = this.props;
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
        <br />
        <span className="article-metadata">
          <p>
            <button onClick={this.handleClick} id={article_id}>
              👏
            </button>
            {votes}
            <Link to={`/articles/${article_id}#comment-box`}>💬</Link>
            {comment_count}
          </p>
        </span>
      </figure>
    );
  }
}

export default ArticleCard;
