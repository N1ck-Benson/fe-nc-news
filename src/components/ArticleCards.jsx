import React from 'react';
import ArticleCard from '../components/ArticleCard'

const ArticleCards = (params) => {
  const { articles, sectionYear } = params;
  
  return (
    <section className='article-cards'>
      {
        articles.map(article => {
          return <ArticleCard article={article} key={sectionYear}/>
        })
      }
    </section>
  );
};

export default ArticleCards;