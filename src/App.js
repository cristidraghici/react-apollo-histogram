import './App.css';
import { useQuery, gql } from '@apollo/client';
import { format } from 'date-fns';

/**
 * Make up a reasonable maximum post count which will show posts from 2019
 */
const REASONABLE_MAXIMUM_POSTS_COUNT = 1000;

// query
const GET_POSTS = gql`
  {
    allPosts(count: ${REASONABLE_MAXIMUM_POSTS_COUNT}) {
      id
      title
      createdAt
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { limit: 5 },
  });

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { allPosts: posts } = data;

  return (
    <div className="App">
      <h1>React and Apollo</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            {format(post.createdAt, 'yyyy-MM')} - {post.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
