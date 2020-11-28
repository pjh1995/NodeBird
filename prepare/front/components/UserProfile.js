import React, { useCallback, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import UserCard from './UserCard';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading, logOutDone } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  useEffect(() => {
    if (logOutDone) {
      Router.push('/');
    }
  }, [logOutDone]);

  return (
    <UserCard User={me}>
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </UserCard>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
