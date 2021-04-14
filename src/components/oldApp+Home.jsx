/*
class App extends Component {
  
  state = {
    articlesByYear: [],
    topics: ["all"],
    filtersToDisplay: [],
    isLoading: true,
  };

  componentDidMount() {
    const { topics } = this.state;
    fetchArticles(topics).then((articlesFromApi) => {
      const newFiltersToDisplay = this.getTopicsFromArticles(articlesFromApi);
      this.setState({
        articlesByYear: articlesFromApi,
        filtersToDisplay: newFiltersToDisplay,
        isLoading: false,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const newTopics = this.state.topics;
    if (prevState.topics.join("") !== newTopics.join("")) {
      fetchArticles(newTopics).then((articlesFromApi) => {
        const newFiltersToDisplay = this.getTopicsFromArticles(articlesFromApi);
        this.setState({
          articlesByYear: articlesFromApi,
          filtersToDisplay: newFiltersToDisplay,
        });
      });
    }
  }

  getTopicsFromArticles = (articlesFromApi) => {
    const articlesByYear = articlesFromApi;
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

  updateTopics = (selectedTopics) => {
    this.setState((currentState) => {
      const { topics } = currentState;
      if (topics.join("") !== selectedTopics.join("")) {
        return { topics: selectedTopics };
      }
    });
  };

  updateSortBy = () => {};

  render() {
    const { isLoading, filtersToDisplay, articlesByYear } = this.state;
    const loadingClass = isLoading ? "" : "isNotLoading";
    return (
      <main className="app">
        <header>
          <Link to="/home" className="header-link">
            <h1>NC News</h1>
          </Link>
          <nav>
            <Link to="/home" className="header-link">
              Home
            </Link>
            <Link to="/home/topics" className="header-link">
              Topics
            </Link>
          </nav>
        </header>
        <Router>
          <Home
            path="home/*"
            isLoading={isLoading}
            filtersToDisplay={filtersToDisplay}
            articlesByYear={articlesByYear}
            loadingClass={loadingClass}
            updateTopics={this.updateTopics}
            updateSortBy={this.updateSortBy}
          />
          <ArticlePage path="articles/:article_id" />
        </Router>
      </main>
    );
  }
}

export default App;
*/

/*

const Home = (props) => {
  const { filtersToDisplay, articlesByYear, loadingClass, updateTopics, updateSortBy } = props;
  return (
    <main>
      <Router>
        <Topics
          path="/topics"
          filtersToDisplay={filtersToDisplay}
          updateTopics={updateTopics}
        />
      </Router>
      <div className={loadingClass}>Loading articles...</div>
      {articlesByYear.map((year) => {
        const sectionYear = Object.keys(year)[0];
        const articles = Object.values(year)[0];
        return (
          <section className="articles-section" key={`${sectionYear}-section`}>
            <header className="articles-header">
              <h2>{sectionYear}</h2>
              <nav>
                Order by:
                <button onClick={updateSortBy}>Topics</button>
                <button>Votes</button>
              </nav>
            </header>
            <section className="article-cards">
              {articles.map((article) => {
                return <ArticleCard article={article} key={article.article_id} />;
              })}
            </section>
          </section>
        );
      })}
    </main>
  );
};

export default Home;

*/