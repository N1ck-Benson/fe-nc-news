import React, { Component } from 'react';
import {Link} from '@reach/router'

class ArticleCard extends Component {

  state = {
    newVotes: 0,
  }

  handleClick = (event) => {
    // patch votes for this article up by one
    // increment newVotes
    console.log(event, 'click event in articleCard-clap')
  }

  render() {
    const {article: {title, author, topic, votes, article_id, comment_count}, key} = this.props
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
            <button onClick={this.handleClick}>👏</button>
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