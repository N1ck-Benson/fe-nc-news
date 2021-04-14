import React from 'react';

// make this a class component
// state contains filtersToDisplay, assigned in CDM using getTopicsFromArticles
// pass articlesByYear down on props
// CHANGE APP TO FUNCTIONAL, HOME TO CLASS
// move getTopicsFromArticles() in here and get it to set the state
// don't move updateTopics... make sure this continues to work in App.js

/*
import React, { Component } from 'react';

class Topics extends Component {

  state = {
    topicsToDisplay: []
  }

  componentDidMount = () => {
    const topics = this.props.getTopicsFromArticles()
    this.setState({topicsToDisplay: topics})
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Topics;
*/

const Topics = (props) => {
  const { updateTopics, filtersToDisplay } = props
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const selectedTopics = []
    const inputSpans = event.target.childNodes
    inputSpans.forEach(inputSpan => {
      const input = inputSpan.childNodes[0] ? inputSpan.childNodes[0]: 'submitButton'
      if(input !== 'submitButton'){
        if(input.checked){selectedTopics.push(input.value)}
      }
    })
    updateTopics(selectedTopics)
  }

  return (
    <section className="topics-section">
      <form onSubmit={handleSubmit}>
        <span className="topic-radio">
          <input type='radio' value='all' id='all' name='radio'/>
          <label htmlFor='all'>all</label>
        </span>
        {filtersToDisplay.map((filter) => {
          return (
            <span className="filter-radio">
              <input
                type="radio"
                value={filter}
                id={filter}
                name="radio"
              />
              <label htmlFor={filter}>{filter}</label>
            </span>
          );
        })}
        <input type="submit" value="Filter"/>
      </form>
    </section>
  );
};

export default Topics;