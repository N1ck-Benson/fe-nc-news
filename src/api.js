import axios from 'axios';
import {getArticlesByYear} from './utils/utils';

const instance = axios.create({
  baseURL: "https://nc-news-database.herokuapp.com/api",
});

export const fetchArticles = (topics) => {
  let articlesPath = '/articles'
  if(topics[0] !== 'all'){
    const queryString = `?filter[topic]=${topics[0]}`
    articlesPath += queryString
  }
  return instance.get(articlesPath).then(({data: {articles}}) => {
    return getArticlesByYear(articles)
  });
};

export const fetchArticleAndComments = (article_id) => {
  const resObject = {}
  return instance.get(`/articles/${article_id}`).then(res => {
    resObject.resArticle = res.data.article
    return instance.get(`/articles/${article_id}/comments`).then(res => {
      resObject.resComments = res.data.comments
      return resObject
    })
  })
}

// The contents of the patch request body is controlled
// Patching votes should only throw an error if the article was deleted
  // between the article being displayed to the client and now
  // --> this would be reflected on page refresh
export const incrementVotes = (article_id) => {
  return instance.patch(`/articles/${article_id}`, {inc_votes: 1});
}

