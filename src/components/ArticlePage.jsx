import React, { Component } from 'react';
import {fetchArticleAndComments} from '../api';

class ArticlePage extends Component {
  state = {
    article: {},
    comments: [],
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
    event.preventDefault()
    // get everything required for the POST request off the event
    // make the POST request
    // if res is a-ok, setState with currentState.comments PLUS this comment, else give an error message
    // setting state will trigger an 'optimistic' rendering, which reflects the impact made by the user, but because there's no CDU function, does not reflect the current state of API
    console.log(event, "event in form handleSubmit");
  };

  handleClick = () => {
    // patch votes for this article up by one
    // increment newVotes
    console.log("inside handleClick in articlePage-clap");
  };

  render() {
    const {
      article: { title, author, topic, body, votes, comment_count },
      comments,
    } = this.state;
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
              <button onClick={this.handleClick}>👏</button>{votes}
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
            const { author, votes, created_at, body, comment_id } = comment;
            // conditionally render 'other-users-comments' and 'this-users-comments'
            return (
              <div className="other-users-comments" key={comment_id}>
                <p>
                  <span>{created_at}</span>
                  <span>{author}</span>
                </p>
                <p>{body}</p>
                <p>
                  <button onClick={this.handleClick}>👏</button>
                  {votes}
                </p>
              </div>
            );
          })}
        </section>
      </main>
    );
  }
}

export default ArticlePage;