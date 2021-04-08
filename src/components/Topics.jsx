import React from 'react';

const Topics = (topicsInState, getTopicsFromArticles, updateTopicsInState) => {
  // flex section contains a form (display: flex) of checkBox inputs
  const topics = getTopicsFromArticles()
  return (
    <section className='topics-section'>
      <form action="">
        {topics.map(topic => {
          return <input value={topic} type="checkBox"/>
        })}
        <button type='submit'>Filter</button>
      </form>
    </section>
  );
};

export default Topics;