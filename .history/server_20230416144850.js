require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

const users = [
  /* {
    username: 'Jim',
    title:'Post 1'
  },
  {
    username: 'Bob',
    title: 'Post 2'
  } */
]

/* const posts=[
  {
    username: 'Jim',
    title:'Post 1'
  },
  {
    username: 'Bob',
    title: 'Post 2'
  }
] */

app.get("/", (req, res) => {
    res.render("index.ejs", {
      isLogged: false,
      user:null
    })
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users",async (req, res) => {
   try {
    const salt = await bcrypt.genSalt(req.body.salt);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = {name: req.body.name, password: hashedPassword, title: req.body.title}
    users.push(user);
    res.status(201).send();
   } catch (error) {
    res.status(500).send();
   }
});

app.post("/users/login",async (req, res) => {
  //Authenticate User
    const user = users.find(user => user.name = req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
      console.log(user)
      if (await  bcrypt.compare(req.body.password, user.password)){

       /*  const username = req.body.name;
        const userDatas = { name: username} */

        /* const accessToken = jwt.sign(userDatas, process.env.ACCES_TOKEN_SECRET)
        res.json({ accessToken: accessToken}) */

        res.send('Allowed')

      } else{
        res.send('Not Allowed')
      }
    } catch (error) {
        res.status(500).json(error);
    }

});

/* app.get("/posts",(req, res) => {
  res.json(users)
}) */

app.listen(3002);

