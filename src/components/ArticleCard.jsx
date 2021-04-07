import React from 'react';

const ArticleCard = (params) => {
  const {article: {title, author}} = params
  return (
    <figure className="article-card">
      <h4>{title}</h4>
      <p>{author}</p>
    </figure>
  );
};

export default ArticleCard;