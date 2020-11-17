const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment, Image, User, Hashtag } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('upload 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    //우선은 하드디스크
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //확장자 추출 ex).png
      const basename = path.basename(file.originalname, ext);
      //basename(file) -> 강아지.png, basename(file,확장자) : 확장자를 제외한 파일 이름만 추출 -> 강아지
      //https://uxicode.tistory.com/entry/nodejs-path-%EB%AA%A8%EB%93%88

      //파일 이름이 중복되면 덮어씌워 지므로 이름을 변경해줌 ex)강아지.png -> 강아지123456789.png
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20mb
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashTagReg = /(#[^\s#]+)/g;
    const hashTags = req.body.content.match(hashTagReg);

    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashTags) {
      const result = await Promise.all(
        hashTags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      ); //[[노드,true],[리액트,false]]
      await post.addHashtags(result.map((v) => v[0]));
    }
    // }#리액트 #노드 #어렵다 #공부 #싫어어어어어

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        //이미지를 여러개 올리면 image:['강아지.png','고양이.png'];
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image })),
        );
        await post.addImages(images);
      } else {
        //이미지를 한개 올리면 image:'강아지.png'
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, //댓글 작성자
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, //포스트 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, //좋아요한 사람들
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post(
  '/images',
  isLoggedIn,
  upload.array('image'), //upload.array:여러개, upload.single:1개, upload.none:text
  async (req, res, next) => {
    try {
      console.log(req.files);
      res.status(200).json(req.files.map((v) => v.filename));
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: { id: postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시물입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(postId),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    await post.addLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    await post.removeLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.update(
      {
        state: false,
      },
      {
        where: { id: req.params.postId, UserId: req.user.id },
      },
    );
    res.status(200).json({ PostId: parseInt(req.params.postId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.json({ id: 1 });
});

module.exports = router;
