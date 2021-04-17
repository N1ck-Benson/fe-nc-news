import axios from 'axios';
import {getArticlesByYear} from './utils/utils';

const instance = axios.create({
  baseURL: "https://nc-news-database.herokuapp.com/api",
});

export const fetchArticles = (topics, orderBy) => {
  let articlesPath = '/articles'
  let queryString = ''
  if(topics[0] !== 'all'){
    queryString = `?filter[topic]=${topics[0]}`
    articlesPath += queryString
  }
  if(orderBy !== 'date'){
    if(queryString === ''){
      queryString = `?sort_by=${orderBy}`
    } else {
      queryString = `&sort_by=${orderBy}`;
    }
    articlesPath += queryString;
    console.log(articlesPath, 'articlesPath in api.js')
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

// username is 'test' until login functionality is implemented
export const postComment = (article_id, comment) => {
  return instance.post(`/articles/${article_id}/comments`, comment);
};

