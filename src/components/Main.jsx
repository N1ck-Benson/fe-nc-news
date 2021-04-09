import { Component } from 'react';
import { Router } from "@reach/router";
import { fetchArticles } from '../api';
import Home from './Home';
import ArticlePage from './ArticlePage';
import '../App.css';

class Main extends Component {
  /* 
  Each 'year' of articles is an object inside an array, 
  so that the ArticlesSections are rendered in the correct order.
  */
  // Topics is an array, but currently users can only select one topic 
  state = {
    articlesByYear: [],
    topics: ['all'],
    filtersToDisplay: [],
    isLoading: true,
  };

  componentDidMount() {
    const {topics} = this.state
    fetchArticles(topics).then(articlesFromApi => {
      const newFiltersToDisplay = this.getTopicsFromArticles(articlesFromApi)
      this.setState({articlesByYear: articlesFromApi, filtersToDisplay: newFiltersToDisplay, isLoading: false})
    })
  }
  
  componentDidUpdate(prevProps, prevState) {
    const newTopics = this.state.topics
    if(prevState.topics.join('') !== newTopics.join('')){
      fetchArticles(newTopics).then(articlesFromApi => {
        const newFiltersToDisplay = this.getTopicsFromArticles(articlesFromApi);
        this.setState({
          articlesByYear: articlesFromApi,
          filtersToDisplay: newFiltersToDisplay,
        });
      });
    }  
  }

  getTopicsFromArticles = (articlesFromApi) => {
    const articlesByYear = articlesFromApi;
    const uniqueTopics = []
    articlesByYear.forEach(yearOfArticles => {
      const articlesFromYear = Object.values(yearOfArticles).flat()
      articlesFromYear.forEach(article => {
        if(uniqueTopics.indexOf(article.topic) < 0){
          uniqueTopics.push(article.topic)
        }
      })
    })
    return uniqueTopics
  }

  updateTopics = (selectedTopics) => {
    this.setState(currentState => {
      const {topics} = currentState
      if(topics.join('') !== selectedTopics.join('')){
        return {topics: selectedTopics}
      }
    })
  };

  render() {
    const { isLoading, filtersToDisplay, articlesByYear } = this.state;
    const loadingClass = isLoading ? '': 'isNotLoading'
    return (
      <main>
        <Router>
          <Home path='home/*' isLoading={isLoading} filtersToDisplay={filtersToDisplay} articlesByYear={articlesByYear} loadingClass={loadingClass} updateTopics={this.updateTopics} />
          <ArticlePage path='articles/:article_id' />
        </Router>
      </main>
    );
  }
}

export default Main