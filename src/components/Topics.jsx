import React from 'react';

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