import axios from 'axios';
import {getArticlesByYear} from './utils/utils';

const instance = axios.create({
  baseURL: "https://nc-news-database.herokuapp.com/api",
});

export const fetchArticles = (topics) => {
  let articlesPath = '/articles'
  console.log(topics, "topics in api.js")
  if(topics[0] !== 'all'){
    const queryString = `?filter[topic]=${topics[0]}`
    articlesPath += queryString
  }
  return instance.get(articlesPath).then(({data: {articles}}) => {
    // getArticlesByYear converts response into an array of year:arr objects
    return getArticlesByYear(articles)
  });
};