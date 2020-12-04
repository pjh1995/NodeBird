const PORT = 80;

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined')); //접속자정보를 좀더 자세히 알 수 있음.
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: ['http://localhost:80', 'http://fatcat.ga'],
    credentials: true,
  }),
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); //json 파싱
app.use(express.urlencoded({ extended: true })); //form 형식 파싱
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.fatcat.ga',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

/*
    app.get -> 가져오다!
    app.post -> 생성하다
    app.put => 전체 수정
    app.delete -> 제거
    app.patch -> 부분 수정
    app.options -> 찔러보기
    app.head => 헤더만 가져오기(헤더/바디)
 */

//prefix
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);
app.use('/user', userRouter);

//에러처리용
// app.use((err, req, res, next) => {

// });

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(PORT, () => {
  console.log(`${PORT} start`);
});
