import React, { Component } from 'react';
import fetchArticleAndComments from '../api';

class ArticlePage extends Component {

  state = {
    article: {},
    comments: [],
    isLoading: 'true',
  }

  componentDidMount = () => {
    const article_id = this.props.location.pathname.slice(-1, -5)
    console.log(article_id, "article id in CDM")
    fetchArticleAndComments(article_id).then(({resArticle, resComments}) => {
      
      // this.setState({article: newArticle})
    })
  }

  componentDidUpdate = () => {

  }

  render() {
    const {article: {title, author, topic, body, votes, comment_count}} = this.state
    return (
      <article>
        <h4>{title}</h4>
        <p>
          <em>by</em> {author}
          <br />
          <em>in</em> {topic}
          <br />
        </p>
        <br />
        <p>{body}</p>
        <span className="article-metadata">
          <p>
            👏 {votes}
            💬 {comment_count}
          </p>
        </span>
      </article>
    );
  }
}

export default ArticlePage;