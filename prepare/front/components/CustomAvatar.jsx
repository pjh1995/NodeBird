import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

// ToDo Custom Card.Meta 만들기.

const CustomAvatar = ({ User }) => {
  return (
    <Link href={`/user/${User.id}`}>
      <a>
        <Avatar>{User.nickname[0]}</Avatar>
      </a>
    </Link>
  );
};

CustomAvatar.propTypes = {
  User: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
};

export default CustomAvatar;
