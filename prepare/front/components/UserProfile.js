import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Card, Avatar, Button } from "antd";
import { logoutAction } from "../reducers/user";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="follower">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>JP</Avatar>} title="JHPARK" />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
