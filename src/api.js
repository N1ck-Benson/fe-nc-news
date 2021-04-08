import axios from 'axios';
import {getArticlesByYear} from './utils/utils';

const instance = axios.create({
  baseURL: "https://nc-news-database.herokuapp.com/api",
});

export const fetchArticles = (topics) => {
  return instance.get('/articles').then(({data: {articles}}) => {
    console.log(getArticlesByYear(articles))
    return getArticlesByYear(articles)
  });
};