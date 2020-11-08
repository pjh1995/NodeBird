const PORT = 3065;

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');

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

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  }),
);

app.use(morgan('dev'));
app.use(express.json()); //json 파싱
app.use(express.urlencoded({ extended: true })); //form 형식 파싱
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

/*
    app.get -> 가져오다.
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
app.use('/user', userRouter);

//에러처리용
// app.use((err, req, res, next) => {

// });

app.listen(PORT, () => {
  console.log(`${PORT} start`);
});
