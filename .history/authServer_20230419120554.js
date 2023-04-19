require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');

let users = [];
let refreshTokens = [];

let data = fs.readFileSync('data.json');
users = JSON.parse(data);

console.log(users);


app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
  res.render("index.ejs", {
    isLogged: false,
    user: null
  })
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.get("/users", (req, res) => {
  res.json(users.filter(user => user.name === req.user.name));
});

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword, title: req.body.title }
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
  fs.writeFileSync("data.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.log("Failed to write updated data to file");
      return;
    }
    console.log("Updated file successfully");
  });
});

app.delete("/users/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204);
})

app.post("/users/login", async (req, res) => {
  //Authenticate User
  console.log(req.body.name);
  const user = users.find(user => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    console.log(user)
    if (await bcrypt.compare(req.body.password, user.password)) {

      const username = req.body.name;
      const userrole = req.body.role;
      const userDatas = {
        name: username
      }

      if (userrole === 'admin') {
        const accessToken = generateAdminAccessToken(userDatas);
        const refreshToken = jwt.sign(userDatas, process.env.ADMIN_REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
      }
      const accessToken = generateAccessToken(userDatas);
      const refreshToken = jwt.sign(userDatas, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken })

    } else {
      res.status(403).send('Not Allowed');
    }
  } catch (error) {
    res.status(500).json(error);
  }

});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: '30s' })
}

function generateAdminAccessToken(user) {
  return jwt.sign(user, process.env.ADMIN_ACCES_TOKEN_SECRET, { expiresIn: '30s' })
}

app.listen(8000);