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
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    const {topics} = this.state
    fetchArticles(topics).then(articlesFromApi => {
      this.setState({articlesByYear: articlesFromApi, isLoading: false})
    })
  }

  getTopicsFromArticles = () => {
    const {articlesByYear} = this.state
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
    const { isLoading, topics, articlesByYear } = this.state;
    const loadingClass = isLoading ? '': 'isNotLoading'
    return (
      <main>
        <Router>
          <Topics path="home/topics" topicsInState={topics} getTopicsFromArticles={this.getTopicsFromArticles} updateTopics={this.updateTopics}/>
        </Router>
        <div className={loadingClass}>Loading articles...</div>
        {
          articlesByYear.map((year) => {
            const key = Object.keys(year).join('')
            console.log(key, 'key of artsec')
            return <ArticlesSection articlesObj={year} key={key}/>;
          })
        }
      </main>
    );
  }
}

export default Main