import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_TYPE } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_TYPE.REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      console.log(
        window.screenY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
      );
      if (
        hasMorePosts &&
        window.screenY + document.documentElement.clientHeight ===
          document.documentElement.scrollHeight
      ) {
        dispatch({
          type: LOAD_POSTS_TYPE.REQUEST,
        });
      }
    }
    window.addEventListener('scroll'.onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
