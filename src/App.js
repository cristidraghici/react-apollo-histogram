import usePosts from './hooks/usePosts';
import Chart from './components/Chart';

import './App.css';
import { useEffect } from 'react';

function App() {
  const { getPosts, refetchPosts, isLoadingPosts, postsError, postsPerMonthOf2019 } = usePosts();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (isLoadingPosts) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>React and Apollo</h1>
      {!!postsError && <div>{postsError.toString()}! <button onClick={() => refetchPosts()}>refetch posts</button></div>}

      <Chart title="Posts in 2019" height={400} width={800} data={postsPerMonthOf2019} />
    </div>
  );
}

export default App;
