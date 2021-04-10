import React, { Component } from 'react';
import {fetchArticleAndComments} from '../api';

class ArticlePage extends Component {

  state = {
    article: {},
    comments: [],
    commentToPost: {},
    isLoading: 'true',
  }

  componentDidMount = () => {
    const path = this.props.location.pathname;
    const article_id = path.slice(path.indexOf('/', 1) + 1, path.length)
    fetchArticleAndComments(article_id).then(({resArticle, resComments}) => {
      this.setState({article: resArticle, comments: resComments})
    })
  }

  handleSubmit(event) {
    // get everything required for the POST request off the event
    // make the POST request
    // if res is a-ok, setState, else give an error message
    console.log(event, "event in articlePage")
  }

  render() {
    const {article: {title, author, topic, body, votes, comment_count}, comments} = this.state
    return (
      <main className="article-page">
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
              <span>👏 {votes}</span>
              <span>💬 {comment_count}</span>
            </p>
          </span>
        </article>
        <form onSubmit={this.handleSubmit}>
          <input type="text" />
          <input
            type="submit"
            value="Post"
            name="submit-comment"
            id="submit-comment"
          />
        </form>
        <section className="comments-section">
          {comments.map((comment) => {
            const { author, votes, created_at, body, comment_id } = comment;
            // conditionally render 'other-users-comments' and 'this-users-comments'
            return (
              <div className="other-users-comments" key={comment_id}>
                <p>
                  <span>{created_at}</span>
                  <span>{author}</span>
                </p>
                <p>{body}</p>
                <p>👏 {votes}</p>
              </div>
            );
          })}
        </section>
      </main>
    );
  }
}

export default ArticlePage;