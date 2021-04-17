import {getArticlesByYear, updateOrder} from './utils'

describe('getArticlesByYear', () => {
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
      body: "We all love Mitch and his wonderful typing style.",
      created_at: "2019-11-15T12:21:54.171Z",
      votes: 24,
      comment_count: 19,
    },
  ]
  it(
    "returns an array of objects, each with a 'year' key holding an array of article objects", () => {
      const actual = getArticlesByYear(input)
      expect(typeof actual).toBe('array')
      expect(actual[0]).toMatchObject({
        '2020': expect.any(Array)
      });
    }
  );
})

// this updateOrder returns either the passed array ordered,
// or if its passed a empty array it returns nothing
describe('updateOrder', () => {
  it('')
})