import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import CustomAvatar from './CustomAvatar';

const UserCard = ({ User, children }) => {
  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${User.id}`}>
            <a>
              짹짹
              <br />
              {User.Posts ? User.Posts.length : 0}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {User.Followings ? User.Followings.length : 0}
            </a>
          </Link>
        </div>,
        <div key="follower">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {User.Followers ? User.Followers.length : 0}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta avatar={<CustomAvatar User={User} />} title={User.nickname} />
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  User: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default UserCard;
