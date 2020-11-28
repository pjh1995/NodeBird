const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment, Hashtag } = require('../models');

const router = express.Router();

router.get('/:hashtag', async (req, res, next) => {
  try {
    const where = { state: true };
    const lastId = parseInt(req.query.lastId);

    if (lastId) {
      where.id = { [Op.lt]: lastId }; //Op.lt 보다 작은
    }
    const posts = await Post.findAll({
      where,
      limit: 10, //갯수.
      //   offset: 100, //구간
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.hashtag) },
        },
        { model: User, attributes: ['id', 'nickname'] },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        { model: User, as: 'Likers', attributes: ['id'] },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
