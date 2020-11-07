const express = require('express');
const bcrypt = require('bcrypt'); //암호화
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    console.log(req.user);
    if (!req.user) {
      return res.status(200).json(null);
    }
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
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
    res.status(200).json(fullUserWithoutPassword);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

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
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
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
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).send('ok');
});
router.post('/', isNotLoggedIn, async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //1~13까지 암호 수준을 정해준다 숫자가 높을수록 오래걸리지만 해독이 어려움..
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
