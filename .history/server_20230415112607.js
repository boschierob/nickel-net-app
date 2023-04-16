require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

const users = []

app.get("/", (req, res) => {
    res.render("index.ejs", {
      isLogged: false,
      user:null
    })
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
   const user = {name: req.body.name, password: req.body.password}
    users.push(user);
    res.status(201).send();
});

app.listen(3002);
