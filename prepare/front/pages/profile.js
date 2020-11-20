import React, { useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { useSelector } from 'react-redux';

import Router from 'next/router';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS, LOAD_FOLLOWINGS } from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList data={me.Followings} isfollower={false} />
        <FollowList data={me.Followers} isfollower />
      </AppLayout>
    </>
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
      type: LOAD_FOLLOWERS.REQUEST,
    });
    context.store.dispatch({
      type: LOAD_FOLLOWINGS.REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise(); // success될때까지 기다려줌.
  },
); // 페이지가 그려지기 전 실행 됨.

export default Profile;
