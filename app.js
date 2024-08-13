const express = require('express');
const { User } = require('./models');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.create({ email, password });

  res.status(201).json({
    id: user.id,
    email: user.email,
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});