import React from 'react';

const ArticleCard = (params) => {
  const {article: {title, author, topic, votes}} = params
  const commentCount = params.article.comment_count
  return (
    <figure className="article-card">
      <h4>{title}</h4>
      <p>
      <em>by</em> {author}
      <br/>
      <em>in</em> {topic}
      <br/>
      </p>
      {/* wrap glasses icon in a Link tag */}
        👓
      <br/>
      <span className='article-metadata'>
        <p>
      👏 {votes}
      💬 {commentCount}
        </p>
      </span>
    </figure>
  );
};

export default ArticleCard;