import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import { LOAD_USER_POSTS } from '../../reducers/post';
import { LOAD_USER, LOAD_MY_INFO } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import CustomAvatar from '../../components/CustomAvatar';
import wrapper from '../../store/configureStore';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_USER_POSTS.REQUEST,
            lastId,
            data: id,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts, id]);

  return (
    <AppLayout>
      <Head>
        <title>{userInfo.nickname}님의 게시글</title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:image" content="https://nodebird.com/favicon.ico" />
        <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts ? userInfo.Posts.length : 0}
            </div>,
            <div key="followings">
              팔로잉
              <br />
              {userInfo.Followings ? userInfo.Followings.length : 0}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers ? userInfo.Followers.length : 0}
            </div>,
          ]}
        >
          <Card.Meta avatar={<CustomAvatar User={userInfo} />} title={userInfo.nickname} />
        </Card>
      ) : null}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  // 프론트 서버 코드
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = ''; // 프론트 서버 코드는 하나이므로 쿠키를 지웠다가 브라우저에 쿠키 있을 때만 넣어줘야함. 안그러면 쿠키가 모두에게 공유됨..!

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_USER_POSTS.REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_MY_INFO.REQUEST,
    });
    context.store.dispatch({
      type: LOAD_USER.REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise(); // success될때까지 기다려줌.
  },
); // 페이지가 그려지기 전 실행 됨

export default User;
