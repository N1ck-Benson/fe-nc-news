import React from 'react';
import ArticleCard from '../components/ArticleCard'

// section invokes a utils function which returns a date-sorted array of articles falling under this year
// then a map on that array returns card components with params

const ArticleCards = (params) => {
  const { sectionYear, articles } = params;
  // extract this function to utils and test it
  const thisYearsArticles = articles.filter(article => {
    const createdYear = parseFloat(article.created_at.slice(0, 4))
    return createdYear === sectionYear ? true: false
  })
  return (
    <section className='article-cards'>
      {
        thisYearsArticles.map(article => {
          return <ArticleCard article={article}/>
        })
      }
    </section>
  );
};

export default ArticleCards;