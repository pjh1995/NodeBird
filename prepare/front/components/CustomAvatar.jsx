import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const CustomAvatar = ({ User }) => {
  return (
    <Link href={`/user/${User.id}`}>
      <Avatar>{User.nickname[0]}</Avatar>
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
