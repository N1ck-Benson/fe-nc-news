import { Component } from 'react';
import { Router } from "@reach/router";
import { fetchArticles } from '../api';
import ArticlesSection from './ArticlesSection'
import Topics from './Topics'
import '../App.css'

class Main extends Component {
  // Each 'year' of articles is an object inside an array, 
  // so that the ArticlesSections are rendered in the correct order.
  state = {
    articlesByYear: [],
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    const {topics} = this.state
    fetchArticles(topics).then(articlesFromApi => {
      this.setState({articlesByYear: articlesFromApi, isLoading: false})
    })
  }

  updateTopics = () => {
    // invoked in TopicsSection component
  };

  render() {
    // Needs to render a Router, which routes the Topics section on the path '/topics'

    const { articlesByYear, isLoading } = this.state;

    // choose a className for a Loading... div based on isLoading
    // render that div with the className
    const loadingClass = isLoading ? '': 'isNotLoading'

    return (
      <main>
        <Router>
          <Topics path="/topics" />
        </Router>
        <div className={loadingClass}>Loading articles...</div>
        {
          articlesByYear.map((year) => {
          return <ArticlesSection articlesObj={year} />;
          })
        }
      </main>
    );
  }
}

export default Main