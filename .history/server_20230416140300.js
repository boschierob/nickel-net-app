require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

const users = []

const posts=[
  {
    username: 'Jim',
    title:'Post 1'
  },
  {
    username: 'Bob',
    title: 'Post 2'
  }
]

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
    const salt = await bcrypt.genSalt(req.params.salt);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = {name: req.body.name, password: hashedPassword}
    users.push(user);
    res.status(201).send();
   } catch (error) {
    res.status(500).send();
   }
});

app.post("/users/login",async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
      if (await  bcrypt.compare(req.body.password, user.password)){
        res.send('Success')
      } else{
        res.send('Not Allowed')
      }
    } catch (error) {
        res.status(500).send();
    }

});

app.get("/posts",(req, res) => {
  res.json(posts)
})

app.listen(3002);

