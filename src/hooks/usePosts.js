import { useMemo } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
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

const usePosts = () => {
  const [getPosts, { loading, error, data, refetch }] = useLazyQuery(GET_POSTS, {});

  // Get the posts value
  const posts = useMemo(() => {
    return !!data && !!data.allPosts ? data.allPosts : [];
  }, [data]);

  // Create the data for the graph
  const postsPerMonthOf2019 = useMemo(() => {
    // get the months
    const months = Array.from({ length: 12 }, (e, i) => {
      return new Date(null, i + 1, null).toLocaleDateString('en', { month: 'short' });
    });

    // set the initial count for each month
    const perMonth = months.reduce((allMonths, month) => {
      allMonths[month] = 0;
      return allMonths;
    }, {});

    // update the count
    for (const post of posts) {
      const createdAt = parseInt(post.createdAt);
      const postYear = format(createdAt, 'yyyy');

      if (postYear === '2019') {
        const postMonth = format(createdAt, 'MMM');
        perMonth[postMonth]++;
      }
    }

    // return the ascending ordered months, in a proper format for the histogram
    return months.map((month) => {
      return { label: month, value: perMonth[month] };
    });
  }, [posts]);

  return { getPosts, refetchPosts: refetch, isLoadingPosts: loading, postsError: error, posts, postsPerMonthOf2019 };
};
export default usePosts;
