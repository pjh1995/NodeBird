const express = require('express');
const app = express();
const PORT = 3065;

app.get('/', (req, res) => {
  res.send('Hello node');
});

app.get('/api', (req, res) => {
  res.send('Hello nodeapi');
});

app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.post('/api/post', (req, res) => {
  res.json({ id: 1, content: 'hello' });
});

app.delete('/api/post', (req, res) => {
  res.json({ id: 1 });
});

app.listen(PORT, () => {
  console.log(`${PORT} start`);
});
