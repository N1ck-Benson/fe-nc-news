import React, { Component } from "react";

class Topics extends Component {
  state = {
    topicsToDisplay: [],
  };

  componentDidMount = () => {
    const { getTopicsFromArticles, articlesByYear } = this.props;
    const topics = getTopicsFromArticles(articlesByYear);
    this.setState({ topicsToDisplay: topics });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const selectedTopics = [];
    const inputSpans = event.target.childNodes;
    const { updateTopics } = this.props;
    inputSpans.forEach((inputSpan) => {
      const input = inputSpan.childNodes[0]
        ? inputSpan.childNodes[0]
        : "submitButton";
      if (input !== "submitButton") {
        if (input.checked) {
          selectedTopics.push(input.value);
        }
      }
    });
    updateTopics(selectedTopics);
  };

  render() {
    const { topicsToDisplay } = this.state;
    return (
      <section className="topics-section">
        <form onSubmit={this.handleSubmit}>
          <span className="topic-radio">
            <input type="radio" value="all" id="all" name="radio" />
            <label htmlFor="all">all</label>
          </span>
          {topicsToDisplay.map((filter) => {
            return (
              <span className="filter-radio">
                <input type="radio" value={filter} id={filter} name="radio" />
                <label htmlFor={filter}>{filter}</label>
              </span>
            );
          })}
          <input type="submit" value="Filter" />
        </form>
      </section>
    );
  }
}

export default Topics;
