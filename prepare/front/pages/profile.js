import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS, LOAD_FOLLOWINGS } from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS.REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS.REQUEST,
    });
  }, []);

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

export default Profile;
