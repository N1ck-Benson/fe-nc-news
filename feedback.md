# Northcoders News Front End

You've made a great start to this. Main thing to work on here is the single article page and being able to link to that articles page. IF you're going to change the main page content that content will need to be wrapped in a Router to differentiate the paths.

Overall the components you have look good if a few too many. You have components like ArticleCards that serve no real purpose. This map could have been done in the parent to keep the component tree much simpler.

I've attached a checklist of everything to work through

## README - write your own and make sure that it:

- [ ] has a link to the deployed version
- [ ] provides general info about your app
- [ ] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)

## UX

- [x] Basic styling added
- [ ] Responsive design

Your article cards don't work too well on a small screen as they have no minimum width and collapse really small. Giving them a `min-width` should sort that out nicely as you're already using flex.

- [x] Items aligned
- [x] Content legible (not too wide, obstructed, etc)
- [ ] Refreshing doesn’t cause an issue on sub-pages
- [ ] No errors in the console

A lot of key warnings from ArticlCards as they all use the sectionYear as the key. Consider using the article_id instead.

- [ ] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading

## Functionality

### Articles

- [x] Serves all articles / top articles

Really nice layout of the Articles by year. Your state structure is a little complex which results in you having to use object keys a lot. Nested arrays or a single object would have been easier to work with.

- [ ] Can vote on articles
- [ ] Can vote a maximum of once in either direction per page load
- [ ] Votes are persistent when page is refreshed
- [ ] Topic pages load only relevant articles (especially when navigating from one topic page to another)

You update the state of topics but don't do anything as a result of it. This is where you should implement some componetDidUpdate logic to handle the topic change. If topics is only every going to be a singular topic why make it an array at all?

- [ ] Can sort articles by date created / comment_count / votes

Lovely to see you using util functions to abstract your logic but the tests are a little light. If you're going to test a function do it throroughly with tdd.

### Individual Article / Comments

- [ ] Individual articles are served with comments
- [ ] Can vote on comments
- [ ] Can vote a maximum of once in either direction per page load
- [ ] Votes are persistent when page is refreshed
- [ ] Can post new comments, which are persistent
- [ ] Can only delete comments of logged in user
- [ ] Deleted comments don’t re-appear on re-render/refresh

### Additional functionality:

- [ ] sort comments by date created / votes
- [ ] navigate over pages of articles (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display articles by specific user
- [ ] post new article
- [ ] delete logged in user's articles

## Error Handling

- [ ] Bad url
- [ ] Bad topic slug in url
- [ ] Bad article id in url
- [ ] Post comment: (No text in comment body / Can you post without logging in?)

## Code

- [x] Well named components
- [x] Functional components used where possible
- [x] Components reused where possible (`Articles` / `Voter`...)
- [x] Minimal state - don't hold derivable data in state
- [x] Set state correctly, using previous state where possible
- [x] Handle asynchronicity clearly (i.e. isLoading pattern)
- [ ] Functions are DRY (`handleChange` for controlled components / api calls)

Your topics component isn't controlling the state of your radio buttons. This is why you have to go through the childNodes to check if the input is checked. This should be refactored to be a controlled component using state and onChange.

- [x] Use object destructuring where possible
- [x] Tidy? If not: ESLint / Prettier
- [x] `node_modules` git ignored
- [ ] No `console.log`s / comments
- [ ] remove unnecessary files (e.g. App.test.js)

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END
