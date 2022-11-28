# React Apollo Histogram

> This is a JavaScript web application that fetches a relevantly-sized list of posts from out mock GraphQL API and displays a chart/histogram representing the number of posts created in each month of 2019. Our GraphQL endpoint: https://fakerql.goosfraba.ro/graphql

## Requirements and Suggestions

The application must be built using React, how you scaffold it is up to you. We use Apollo for GraphQL API communication, but you can use a different solution if you feel it is better suited. The histogram must be constructed using D3 or VISX (recommended). Use Git for version control and commit any progress you make. Write a brief summary in your README about your process, your choices and any challenges you faced.

### Links

- Documentation for the schema behind FakerQL: https://github.com/notrab/fakerql
- Our GraphQL Playground: https://fakerql.goosfraba.ro/
- VISX Repo: https://github.com/airbnb/visx

### Commits

The initial plan is to scaffold the project, add graphql, then create the histogram and maybe some cleanup at the end. Depending on the complexity of the code, we might also add some jest tests, if needed. For proper code formatting we will use prettier with the defaults provided by vscode and also the `.editorconfig` file.

#### C1: Initial commit

We will use `create-react-app` due to its simplicity, given the fact that this task is one with small complexity.

#### C2: Add the GraphQL connection

Install the necessary packages to connect to the endpoint and make a basic query. At the moment, the jest test has been removed, due to its content not providing much value at this point.

Links:

- https://www.freecodecamp.org/news/5-ways-to-fetch-data-react-graphql/
- https://prismic.io/docs/query-data-graphql

#### C3: Create the histogram
