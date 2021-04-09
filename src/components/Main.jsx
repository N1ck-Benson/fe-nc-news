import { Component } from 'react';
import { Router } from "@reach/router";
import { fetchArticles } from '../api';
import ArticlesSection from './ArticlesSection'
import Topics from './Topics'
import '../App.css'

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
      console.log('new filters in main CDM: ', newFiltersToDisplay)
      this.setState({articlesByYear: articlesFromApi, filtersToDisplay: newFiltersToDisplay, isLoading: false})
    })
  }
  
  componentDidUpdate(prevProps, prevState) {
    const newTopics = this.state.topics
    if(prevState.topics.join('') !== newTopics.join('')){
      console.log('change detected by cDU')
      fetchArticles(newTopics).then(articlesFromApi => {
        const newFiltersToDisplay = this.getTopicsFromArticles(articlesFromApi);
        console.log(newFiltersToDisplay, "new filters for state")
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
          <Topics path="home/topics" filtersToDisplay={filtersToDisplay} updateTopics={this.updateTopics}/>
        </Router>
        <div className={loadingClass}>Loading articles...</div>
        {
          articlesByYear.map((year) => {
            return <ArticlesSection articlesObj={year} key={Object.keys(year).join('')}/>;
          })
        }
      </main>
    );
  }
}

export default Main