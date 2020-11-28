import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';

import { useSelector } from 'react-redux';

import Router from 'next/router';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO } from '../reducers/user';
import wrapper from '../store/configureStore';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);
const LIMIT_NUM = 3;
const Profile = () => {
  const { me } = useSelector((state) => state.user);

  const [followersLimit, setFollowersLimit] = useState(LIMIT_NUM);
  const [followingsLimit, setFollowingsLimit] = useState(LIMIT_NUM);

  const { data: followersData, error: followerError } = useSWR(
    // redux 대신 사용가능
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher,
  );
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher,
  );

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + LIMIT_NUM);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + LIMIT_NUM);
  }, []);

  if (!me) {
    return <div>내 정보 로딩중...</div>;
  }
  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로워/팔로잉 로딩 중 에러가 발생합니다.</div>;
  }

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
        <FollowList
          data={followersData}
          isfollower={false}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
        <FollowList
          data={followingsData}
          isfollower
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followerError}
        />
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
      type: LOAD_MY_INFO.REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise(); // success될때까지 기다려줌.
  },
); // 페이지가 그려지기 전 실행 됨.

export default Profile;
