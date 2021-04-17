import React, { Component } from 'react';
import {fetchArticleAndComments} from '../api';
import {incrementVotes, postComment} from '../api';

class ArticlePage extends Component {
  state = {
    article: {},
    comments: [],
    newComment: {},
    newVotes: 0,
    isLoading: true,
    isLoadingComment: false,
  };

  componentDidMount = () => {
    const path = this.props.location.pathname;
    const article_id = path.slice(path.indexOf("/", 1) + 1, path.length);
    fetchArticleAndComments(article_id).then(({ resArticle, resComments }) => {
      this.setState({ article: resArticle, comments: resComments, isLoading: false });
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.comments.join('') !== this.state.comments.join('')){
      this.setState({isLoadingComment: false})
    }
  }

  // username is currently hardcoded as 'test-user'
  // CONTROL THE INPUT - no empty field
  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target.firstChild;
    const comment = { username: "jessjelly", body: value };
    const {
      article: { article_id },
    } = this.state;
    postComment(article_id, comment).then((res) => {
      const newComments = [...this.state.comments]
      newComments.unshift(res.data.comment)
      this.setState({ comments: newComments, isLoadingComment: true });
    });
  };

  handleClick = () => {
    const { article: {article_id}, newVotes } = this.state;
    if(newVotes < 1){
      incrementVotes(article_id);
      this.setState(currentState => {
        return { newVotes: currentState.newVotes + 1 };
      });
    }
  };

  render() {
    const {
      article: { title, author, topic, body, comment_count },
      comments, 
    } = this.state;
    let {article: {votes}, newVotes, isLoading} = this.state
    votes += this.state.newVotes
    const loadingClass = isLoading ? "" : "isNotLoading";
    const buttonClass = newVotes < 1 ? "unclickedButton" : "clickedButton"
    return (
      <main className="article-page">
        <div className={loadingClass}>Loading article...</div>
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
              <button className={buttonClass} onClick={this.handleClick}>👏</button>
              {votes}
              <span>💬 {comment_count}</span>
            </p>
          </span>
        </article>
        <form onSubmit={this.handleSubmit} id="comment-box">
          <input type="text" />
          <input type="submit" value="Post" />
        </form>
        <div className={loadingClass}>Loading comments...</div>
        <section className="comments-section">
          {comments.map((comment) => {
            const { author, body, comment_id, created_at } = comment;
            
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