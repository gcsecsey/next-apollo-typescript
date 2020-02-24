# Apollo Example

## Changes to work with Typescript

  - A [tsconfig file](tsconfig.json) has been created using the default values from Next and also extending it for strict type checking
  - Types have been added to the [Apollo connector](lib/apollo.tsx). Types are used from the `apollo-client`, `apollo-cache-inmemory` and `@apollo/react-hooks` libraries.
  - GraphQL queries and mutations have been structured out to a separate [graphql](graphql) folder for easier reusability, testing and code generation.
  - I used the [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) to generate types based on the schema and the GraphQL queries/mutations. This enables type checking and intellisense on DTOs.
  - All the components have been converted to TSX, default imports have been replaced by names ones.

## Demo

This version: https://codesandbox.io/s/github/gcsecsey/next-apollo-typescript
JS version: https://next-with-apollo.now.sh

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example with-apollo with-apollo-app
# or
yarn create next-app --example with-apollo with-apollo-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-apollo
cd with-apollo
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download)):

```bash
now
```

## The idea behind the example

[Apollo](https://www.apollographql.com/client/) is a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.

In this simple example, we integrate Apollo seamlessly with Next by wrapping our `pages/index.js` inside a [higher-order component (HOC)](https://facebook.github.io/react/docs/higher-order-components.html). Using the HOC pattern we're able to pass down a central store of query result data created by Apollo into our React component hierarchy defined inside each page of our Next application.

On initial page load, while on the server and inside `getInitialProps`, we invoke the Apollo method, [`getDataFromTree`](https://www.apollographql.com/docs/react/api/react-ssr/#getdatafromtree). This method returns a promise; at the point in which the promise resolves, our Apollo Client store is completely initialized.

This example relies on [graph.cool](https://www.graph.cool) for its GraphQL backend.

Note: Do not be alarmed that you see two renders being executed. Apollo recursively traverses the React render tree looking for Apollo query components. When it has done that, it fetches all these queries and then passes the result to a cache. This cache is then used to render the data on the server side (another React render).
https://www.apollographql.com/docs/react/api/react-ssr/#getdatafromtree
