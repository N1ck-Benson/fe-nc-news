import React, { Component } from 'react';
import {fetchArticleAndComments} from '../api';
import {incrementVotes} from '../api';

class ArticlePage extends Component {
  state = {
    article: {},
    comments: [],
    newVotes: 0,
    isLoading: "true",
  };

  componentDidMount = () => {
    const path = this.props.location.pathname;
    const article_id = path.slice(path.indexOf("/", 1) + 1, path.length);
    fetchArticleAndComments(article_id).then(({ resArticle, resComments }) => {
      this.setState({ article: resArticle, comments: resComments });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // get everything required for the POST request off the event
    // make the POST request
    // if res is a-ok, setState with currentState.comments PLUS this comment, else give an error message
    // setting state will trigger an 'optimistic' rendering, which reflects the impact made by the user, but because there's no CDU function, does not reflect the current state of API
    console.log(event, "event in form handleSubmit");
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
      article: { title, author, topic, body, article_id, comment_count },
      comments,
    } = this.state;
    let {article: {votes}} = this.state
    votes += this.state.newVotes
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
              <button onClick={this.handleClick} id={article_id}>
                👏
              </button>
              {votes}
              <span>💬 {comment_count}</span>
            </p>
          </span>
        </article>
        <form onSubmit={this.handleSubmit} id="comment-box">
          <input type="text" />
          <input type="submit" value="Post" />
        </form>
        <section className="comments-section">
          {comments.map((comment) => {
            const { author, created_at, body, comment_id } = comment;
            // conditionally render 'other-users-comments' and 'this-users-comments'
            return (
              <div
                className="other-users-comments"
                key={`comment_${comment_id}`}
              >
                <p>
                  <span>{created_at}</span>
                  <span>{author}</span>
                </p>
                <p>{body}</p>
              </div>
            );
          })}
        </section>
      </main>
    );
  }
}

export default ArticlePage;