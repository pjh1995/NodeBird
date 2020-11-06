const express = require('express');
const { Post, Comment, Image, User } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          models: Image,
        },
        {
          models: Comment,
        },
        {
          models: User,
        },
      ],
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/', isLoggedIn, (req, res) => {
  res.json({ id: 1 });
});

router.post(':postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: { id: postId },
    });
    if (post) {
      return res.status(403).send('존재하지 않는 게시물입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
