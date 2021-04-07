import { Component } from 'react';
import { Router } from "@reach/router";
import ArticlesSection from './ArticlesSection'
import Topics from './Topics'
import '../App.css'

class Main extends Component {
  // articleYears currently filled with test years
  state = {
    articleYears: [2021, 2020, 2019],
    topics: [],
  }

  componentDidMount(){
    // sets state, fetching articleYears from API
    // and using a utils function to get all the years
  }

  updateTopics = () => {
    // invoked in TopicsSection component
  }

  // renders a section, which renders an ArticlesSection for each year
  // Then renders a Router, which routes the Topics section on the path='/topics'

  render(){
    const {articleYears} = this.state
    return (
      // want to do forEach and make ArticlesSections here
      <main>
        <Router>
          <Topics path="/topics" />
        </Router>
        {articleYears.map((year) => {
          return <ArticlesSection sectionYear={year} />;
        })}
      </main>
    );
  }
}

export default Main