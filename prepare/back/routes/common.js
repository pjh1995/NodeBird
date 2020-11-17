const { User, Post } = require('../models');

exports.getUserFromUserId = async (id) => {
  return await User.findOne({ where: { id } });
};

exports.getFullUserWithoutPassword = async (id) => {
  return await User.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Post,
        where: {
          state: true,
        },
        attributes: ['id'],
      },
      {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      },
      {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      },
    ],
  });
};
