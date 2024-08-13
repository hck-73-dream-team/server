const express = require("express");
const { User } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email/password",
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      message: "Invalid email/password",
    });
  }

  const access_token = jwt.sign({
    id: user.id,
  });

  res.json({
    access_token,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
