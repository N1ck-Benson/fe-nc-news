import { getArticlesByYear, getTopicsFromArticles } from "./utils";

describe("getArticlesByYear", () => {
  const input = [
    {
      title: "Eight pug gifs that remind me of mitch",
      topic: "mitch",
      author: "icellusedkars",
      article_id: 1,
      body: "some gifs",
      created_at: "2020-11-15T12:21:54.171Z",
      votes: 34,
      comment_count: 13,
    },
    {
      title: "Student SUES Mitch!",
      topic: "mitch",
      author: "rogersop",
      article_id: 1,
      body: "We all love Mitch and his wonderful typing style.",
      created_at: "2019-11-15T12:21:54.171Z",
      votes: 24,
      comment_count: 19,
    },
  ];
  it("takes an array of article objects and returns an array", () => {
    const actual = getArticlesByYear(input);
    expect(Array.isArray(actual)).toBe(true);
  });
  it("returns an array of single-key objects, ordered ascending by the value of their keys", () => {
    const keys = getArticlesByYear(input).map((yearObject) => {
      return parseInt(Object.keys(yearObject).join(""));
    });
    expect(keys[0]).toBeGreaterThan(keys[1]);
  });
  it("returns an array of article objects on each key, whose created_at values match that key", () => {
    const output = getArticlesByYear(input);
    output.forEach((yearObj) => {
      const year = Object.keys(yearObj).join("");
      yearObj[year].forEach((articleObj) => {
        const created_at = articleObj.created_at.slice(0, 4);
        expect(created_at).toBe(year);
      });
    });
  });
  it("returns article objects of the same structure as those in the passed array", () => {
    const output = getArticlesByYear(input);
    output.forEach((yearObj) => {
      const year = Object.keys(yearObj).join("");
      yearObj[year].forEach((articleObj) => {
        expect(articleObj).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(Number),
        });
      });
    });
  });
  it("does not mutate the passed array", () => {
    const inputCopy = [...input];
    getArticlesByYear(inputCopy);
    expect(inputCopy).toEqual(input);
  });
});

describe("getTopicsFromArticles", () => {
  let articles = [
    {
      title: "Eight pug gifs that remind me of mitch",
      topic: "mitch",
      author: "icellusedkars",
      article_id: 1,
      body: "some gifs",
      created_at: "2020-11-15T12:21:54.171Z",
      votes: 34,
      comment_count: 13,
    },
    {
      title: "Student SUES Mitch!",
      topic: "students",
      author: "rogersop",
      article_id: 1,
      body: "We all love Mitch and his wonderful typing style.",
      created_at: "2019-11-15T12:21:54.171Z",
      votes: 24,
      comment_count: 19,
    },
  ];
  let articlesByYear = getArticlesByYear(articles);

  it("takes an array of article objects and returns an array", () => {
    const actual = getTopicsFromArticles(articlesByYear);
    expect(Array.isArray(actual)).toBe(true);
  });
  it("(the array) contains only strings", () => {
    const actual = getTopicsFromArticles(articlesByYear);
    actual.forEach((item) => {
      expect(typeof item).toBe("string");
    });
  });
  it("(the array) contains items for each unique topic contained in the objects on the passed array", () => {
    let actual = getTopicsFromArticles(articlesByYear);
    let expected = ["mitch", "students"];
    expect(actual).toEqual(expected);
    articles.push({
      title: "Students terrorize Mitch",
      topic: "rebellion",
      author: "rogersop",
      article_id: 1,
      body: "We all love Mitch and his wonderful typing style.",
      created_at: "2019-11-15T12:21:54.171Z",
      votes: 24,
      comment_count: 19,
    });
    articlesByYear = getArticlesByYear(articles);
    actual = getTopicsFromArticles(articlesByYear);
    expected = ["mitch", "students", "rebellion"];
    expect(actual).toEqual(expected);
  });
  it("does not mutate the passed array", () => {
    const inputCopy = [...articlesByYear];
    getTopicsFromArticles(inputCopy);
    expect(inputCopy).toEqual(articlesByYear);
  });
});
