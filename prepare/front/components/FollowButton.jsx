import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { UNFOLLOW, FOLLOW } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user,
  );
  const isFollowing =
    me && me.Followings && me.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    const type = isFollowing ? UNFOLLOW.REQUEST : FOLLOW.REQUEST;
    dispatch({
      type,
      data: post.User.id,
    });
  }, [isFollowing]);
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
