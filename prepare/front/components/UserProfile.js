import React, { useCallback, useEffect } from 'react';
import { Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import CustomAvatar from './CustomAvatar';
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
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Posts ? me.Posts.length : 0}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings ? me.Followings.length : 0}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {me.Followers ? me.Followers.length : 0}
        </div>,
      ]}
    >
      <Card.Meta avatar={<CustomAvatar User={me} />} title={me.nickname} />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
