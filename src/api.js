import axios from 'axios';
import {getArticlesByYear} from './utils/utils';

const instance = axios.create({
  baseURL: "https://nc-news-database.herokuapp.com/api",
});

export const fetchArticles = (topics) => {
  let articlesPath = '/articles'
  if(topics.length){
    const queryString = `?topic=${topics[0]}`
    articlesPath += queryString
  }
  return instance.get(articlesPath).then(({data: {articles}}) => {
    // getArticlesByYear converts response into an array of year:arr objects
    return getArticlesByYear(articles)
  });
};