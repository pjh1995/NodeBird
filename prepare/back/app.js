const express = require('express');
const app = express();
const PORT = 3065;
const postRouter = require('./routes/post');
/*
    app.get -> 가져오다.
    app.post -> 생성하다
    app.put => 전체 수정
    app.delete -> 제거
    app.patch -> 부분 수정
    app.options -> 찔러보기
    app.head => 헤더만 가져오기(헤더/바디)
 */

app.get('/', (req, res) => {
  res.send('Hello node');
});

app.get('/api', (req, res) => {
  res.send('Hello nodeapi');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

//prefix
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log(`${PORT} start`);
});
