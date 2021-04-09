import React from 'react';
import ArticleCard from '../components/ArticleCard'

const ArticleCards = (params) => {
  const { articles } = params;
  
  return (
    <section className='article-cards'>
      {
        articles.map(article => {
          return <ArticleCard article={article} key={article.article_id}/>
        })
      }
    </section>
  );
};

export default ArticleCards;