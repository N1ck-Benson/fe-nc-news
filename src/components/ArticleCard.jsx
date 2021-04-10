import React from 'react';
import {Link} from '@reach/router'

const ArticleCard = (params) => {
  const {article: {title, author, topic, votes, article_id, comment_count}, key} = params
  return (
    <figure className="article-card" key={key}>
      <h4>{title}</h4>
      <p>
      <em>by</em> {author}
      <br/>
      <em>in</em> {topic}
      <br/>
      </p>
      <Link to={`/articles/${article_id}`}>
        👓
      </Link>
      <br/>
      <span className='article-metadata'>
        <p>
      👏 {votes}
      💬 {comment_count}
        </p>
      </span>
    </figure>
  );
};

export default ArticleCard;