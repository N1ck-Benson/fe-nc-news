export const getArticlesByYear = (articlesFromApi) => {
  const articlesbyYear = [];
  const years = [];
  articlesFromApi.forEach((article) => {
    const year = article.created_at.slice(0, 4);
    if (years.indexOf(year) < 0) {
      years.push(year);
    }
  });
  years.forEach((year) => {
    const yearOfArticles = {};
    const filteredArticles = articlesFromApi.filter((article) => {
      return article.created_at.slice(0, 4) === year;
    });
    yearOfArticles[year] = filteredArticles;
    articlesbyYear.push(yearOfArticles);
  });
  return articlesbyYear;
};

export const getTopicsFromArticles = (articlesByYear) => {
  const uniqueTopics = [];
  articlesByYear.forEach((yearOfArticles) => {
    const articlesFromYear = Object.values(yearOfArticles).flat();
    articlesFromYear.forEach((article) => {
      if (uniqueTopics.indexOf(article.topic) < 0) {
        uniqueTopics.push(article.topic);
      }
    });
  });
  return uniqueTopics;
};
