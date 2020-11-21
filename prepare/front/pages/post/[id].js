import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { END } from 'redux-saga';

import Head from 'next/head';
import { LOAD_MY_INFO } from '../../reducers/user';
import { LOAD_POST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
// post/[id].js

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : 'https://nodebird.com/favicon.ico'
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
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
      type: LOAD_MY_INFO.REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST.REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise(); // success될때까지 기다려줌.
  },
); // 페이지가 그려지기 전 실행 됨.

export default Post;
