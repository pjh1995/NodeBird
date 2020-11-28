const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt'); //암호화
const passport = require('passport');

const { Post, User, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { getUserFromUserId, getFullUserWithoutPassword } = require('./common');

const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) {
      return next('user null');
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error('' + loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await getFullUserWithoutPassword(user.id);

      if (!fullUserWithoutPassword) {
        return res.status(200).json(user);
      }
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      },
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.json({ id: 1 });
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await getUserFromUserId(req.params.userId);

    if (!user) {
      res.status(403).send('해당 유저가 존재하지 않습니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(200).json(null);
    }

    const user = await getUserFromUserId(req.user.id);

    if (!user) {
      res.status(403).send('해당 유저가 존재하지 않습니다.');
    }

    console.log('limit@@@@@@');
    console.log(parseInt(req.query.limit, 10));
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.json({ id: 1 });
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(200).json(null);
    }
    const user = await getUserFromUserId(req.user.id);

    if (!user) {
      res.status(403).send('해당 유저가 존재하지 않습니다.');
    }

    console.log('limit@@@@@@');
    console.log(parseInt(req.query.limit, 10));

    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.json({ id: 1 });
});

router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { state: true, userId: req.params.userId };
    const lastId = parseInt(req.query.lastId);

    if (lastId) {
      where.id = { [Op.lt]: lastId }; //Op.lt 보다 작은
    }
    const posts = await Post.findAll({
      where,
      limit: 10, //갯수
      //   offset: 100, //구간
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
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

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await getUserFromUserId(req.params.userId);

    if (!user) {
      return res.status(403).send('해당 유저가 존재하지 않습니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error + '..?!');
    next(error);
  }
  res.json({ id: 1 });
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await getUserFromUserId(req.params.userId);

    if (!user) {
      res.status(403).send('해당 유저가 존재하지 않습니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await getFullUserWithoutPassword(req.params.userId);
    if (!fullUserWithoutPassword) {
      return res.status(404).send('존재하지 않는 사용자 입니다.');
    }
    res.status(200).json(fullUserWithoutPassword);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  console.log(req.headers);
  try {
    console.log(req.user);
    if (!req.user) {
      return res.status(200).json(null);
    }
    const fullUserWithoutPassword = await getFullUserWithoutPassword(req.user.id);
    res.status(200).json(fullUserWithoutPassword);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //1~13까지 암호 수준을 정해준다 숫자가 높을수록 오래걸리지만 해독이 어려움.
    const exUser = await User.findOne({
      where: {
        email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    res.status(200).send('ok');
  } catch (error) {
    console.log(error);
    next(error);
  }

  res.json({ id: 1, content: 'hello' });
});

module.exports = router;
