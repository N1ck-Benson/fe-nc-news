const thisYearsArticles = articles.filter((article) => {
  const createdYear = parseFloat(article.created_at.slice(0, 4));
  return createdYear === sectionYear ? true : false;
});

// ^ filter from ArticleCards to use in fetchArticlesByYear