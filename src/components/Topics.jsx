import React from 'react';

const Topics = (params) => {
  const { getTopicsFromArticles, updateTopics } = params
  const topicsFromArticles = getTopicsFromArticles()
  
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
          <input type='radio' value='' id='all' name='radio'/>
          <label htmlFor='all'>all topics</label>
        </span>
        {topicsFromArticles.map((topic) => {
          return (
            <span className="topic-radio">
              <input
                type="radio"
                value={topic}
                id={topic}
                name="radio"
              />
              <label htmlFor={topic}>{topic}</label>
            </span>
          );
        })}
        <input type="submit" value="Filter"/>
      </form>
    </section>
  );
};

export default Topics;