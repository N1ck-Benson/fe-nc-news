import { Component } from 'react';
import { Router } from "@reach/router";
import { fetchArticlesByYear } from '../utils/utils'
import ArticlesSection from './ArticlesSection'
import Topics from './Topics'
import '../App.css'

class Main extends Component {
  // articlesByYear is currently filled with test articles
  state = {
    // each 'year' of articles is an object inside an array, so that the ArticlesSections are rendered in the correct order
    articlesByYear: [],
    topics: [],
  };

  componentDidMount() {
    const {topics} = this.state
    fetchArticlesByYear(topics).then(articles => {
      this.setState({articlesByYear: articles})
    })
  }

  updateTopics = () => {
    // invoked in TopicsSection component
  };

  render() {
    // Needs to render a Router, which routes the Topics section on the path='/topics'

    const { articlesByYear } = this.state;

    return (
      <main>
        <Router>
          <Topics path="/topics" />
        </Router>
        {articlesByYear.map((year) => {
          return <ArticlesSection articlesObj={year} />;
        })}
      </main>
    );
  }
}

export default Main