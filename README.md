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

- [https://www.freecodecamp.org/news/5-ways-to-fetch-data-react-graphql/](https://www.freecodecamp.org/news/5-ways-to-fetch-data-react-graphql/)
- [https://prismic.io/docs/query-data-graphql](https://prismic.io/docs/query-data-graphql)

#### C3: Create the histogram

We would like to have a data structure which would represent the each of the months in 2019. With this occasion, we will refactor the fetching part of the app into a custom hook. We will also create the initial form of the histogram, with bars and left and bottom axis.

Links:

- [https://date-fns.org/v2.0.0-alpha.25/docs/format](https://date-fns.org/v2.0.0-alpha.25/docs/format)
- [https://thewebdev.info/2020/12/26/create-a-react-bar-graph-with-the-visx-library/](https://thewebdev.info/2020/12/26/create-a-react-bar-graph-with-the-visx-library/)

#### C4: Add a tooltip to show the exact value

One necessary feature is to see the exact value of a bar in the histogram. To do so, we will add a tooltip on each of the bars in the histogram.

Links:

- [https://airbnb.io/visx/docs/tooltip](https://airbnb.io/visx/docs/tooltip)
- [https://dev.to/mariazentsova/building-a-line-chart-in-react-with-visx-1jkp](https://dev.to/mariazentsova/building-a-line-chart-in-react-with-visx-1jkp)
