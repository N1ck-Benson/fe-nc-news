import React, { Component } from "react";
import { fetchArticleAndComments } from "../api";
import { incrementVotes, postComment, deleteComment } from "../api";
import {
  Button,
  Card,
  Classes,
  Divider,
  Icon,
  Spinner,
  SpinnerSize,
  Text,
  TextArea,
} from "@blueprintjs/core";

class ArticlePage extends Component {
  state = {
    article: {},
    comments: [],
    newVotes: 0,
    isLoading: true,
    isLoadingComment: true,
    newComment: "",
    commentsDeleted: [],
  };

  componentDidMount = () => {
    const path = this.props.location.pathname;
    const article_id = path.slice(path.indexOf("/", 1) + 1, path.length);
    fetchArticleAndComments(article_id).then(({ resArticle, resComments }) => {
      this.setState({
        article: resArticle,
        comments: resComments,
        isLoading: false,
      });
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.comments.join("") !== this.state.comments.join("")) {
      this.setState({ isLoadingComment: false });
    }
  };

  onInputChange = ({ nativeEvent: { inputType, data } }) => {
    let input = this.state.newComment;
    if (data) {
      input = input + data;
    } else if (inputType === "insertLineBreak") {
      input = input + "\n";
    } else if (inputType === "deleteContentBackward") {
      input = input.slice(0, -1);
    } else if (inputType === "deleteSoftLineBackward") {
      input = "";
    }
    this.setState({ newComment: input });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const comment = {
      username: this.props.username,
      body: this.state.newComment,
    };
    const {
      article: { article_id },
    } = this.state;
    postComment(article_id, comment).then((res) => {
      const newComments = [...this.state.comments];
      newComments.unshift(res.data.comment);
      this.setState({
        comments: newComments,
        isLoadingComment: true,
        newComment: "",
      });
    });
  };

  handleClick = ({ target: { name, id } }) => {
    if (name === "vote") {
      const {
        article: { article_id },
        newVotes,
      } = this.state;
      if (newVotes < 1) {
        incrementVotes(article_id);
        this.setState((currentState) => {
          return { newVotes: currentState.newVotes + 1 };
        });
      }
    } else {
      const commentId = parseInt(id.slice(7));
      const newCommentsDeleted = [...this.state.commentsDeleted];
      console.log(this.state.commentsDeleted, "#1");
      newCommentsDeleted.push(commentId);
      deleteComment(commentId);
      this.setState({ commentsDeleted: newCommentsDeleted });
      console.log(this.state.commentsDeleted, "#2");
    }
  };

  render() {
    const {
      article: { title, author, topic, body, comment_count },
      comments,
      isLoading,
      isLoadingComment,
      newComment,
    } = this.state;
    let {
      article: { votes },
      newVotes,
    } = this.state;
    votes += this.state.newVotes;
    const buttonClass = newVotes < 1 ? "unclickedButton" : "clickedButton";
    return (
      <main className="article-page">
        <article>
          <h2>{title}</h2>
          <p>
            <em>by</em> <span className="highlighted-text">{author}</span>{" "}
            &nbsp;
            <em>in</em> <span className="highlighted-text">{topic}</span>
            <br />
          </p>
          <Divider />
          <br />
          {isLoading ? <Spinner size={SpinnerSize.STANDARD} /> : <p>{body}</p>}
          <Divider />
        </article>
        <div className="article-page-actions">
          <span className="article-page-action-comment">
            <form
              className="article-page-comment-box"
              onSubmit={this.handleSubmit}
              id="comment-box"
            >
              <Text ellipsize={true} />
              <TextArea
                fill={true}
                onChange={this.onInputChange}
                value={newComment}
              />
              <input
                className="article-page-submit-button"
                type="submit"
                value="Post"
              />
            </form>
          </span>
          <span className="article-page-action-buttons">
            <span className="article-page-action-button">
              {" "}
              <Icon icon="comment" />
              &nbsp;
              {comment_count}
            </span>
            <span className="article-page-action-button">
              <button
                className={buttonClass}
                onClick={this.handleClick}
                name="vote"
              >
                👏
              </button>
              &nbsp;
              {votes}
            </span>
          </span>
        </div>
        <section className="comments-section">
          {isLoadingComment ? (
            <Spinner size={SpinnerSize.STANDARD} />
          ) : (
            comments.map((comment) => {
              const { author, body, comment_id, created_at } = comment;
              if (!this.state.commentsDeleted.includes(comment_id)) {
                const createdAtTrimmed = created_at.slice(
                  0,
                  created_at.indexOf("T")
                );
                const deletePlusId = "delete_" + comment_id;
                return (
                  <Card key={`comment_${comment_id}`} className="comment-card">
                    <section>
                      <p>
                        <span>{`${author} | ${createdAtTrimmed}`}</span>
                      </p>
                      <p>{body}</p>
                    </section>
                    {author === this.props.username && (
                      <Button
                        className={Classes.MINIMAL}
                        intent="danger"
                        icon="eraser"
                        onClick={this.handleClick}
                        id={deletePlusId}
                      />
                    )}
                  </Card>
                );
              }
            })
          )}
        </section>
      </main>
    );
  }
}

export default ArticlePage;
