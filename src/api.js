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
    // getArticlesByYear converts response into an array of year:arr objects
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