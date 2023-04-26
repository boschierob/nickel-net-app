require("dotenv").config();
var { authRole } = require('./roleAuthMiddleware/roleAuth');

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { ROLE } = require('./data/role');

//connect to batabase
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', function (err) {console.log(err)})
db.once('open', function () {console.log('Connected to Database')})

//const Subscriber = require('../models/subscriber')

//const { users } = require('./data')
const projectRouter = require('./routes/projects');
const interventionRouter = require('./routes/interventions');

app.use('/projects', projectRouter);
app.use('/interventions', interventionRouter);


let users = [];

let data = fs.readFileSync('data.json');
users = JSON.parse(data);

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/',(req, res) => {
  res.send('Home Page')
})

app.get('/admin-page', authenticateToken, authRole(ROLE.ADMIN),(req, res) => {
  res.send('Admin Page')
})

app.get('/dashboard',authenticateToken, authRole(ROLE.EMPLOYEE),(req, res) => {
  res.send('Dashboard Page')
})


app.get("/users", authenticateToken, (req, res) => {
    res.json(users.filter(user => user.name === req.user.name));
});

app.post("/users",async (req, res) => {
   try {
    const salt = await bcrypt.genSalt();
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
  console.log(req.body.name);
    const user = users.find(user => user.name === req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
      console.log(user)
      if (await  bcrypt.compare(req.body.password, user.password)){

        const username = req.body.name;
        const userDatas = { name: username} 

         const accessToken = jwt.sign(userDatas, process.env.ACCES_TOKEN_SECRET)
        res.json({ accessToken: accessToken}) 

      } else{
        res.status(403).send('Not Allowed');
      }
    } catch (error) {
        res.status(500).json(error);
    }

});

app.get('/projects', authenticateToken,(req, res) => {
  res.json(projects)
})
/* app.get("/posts",(req, res) => {
  res.json(users)
}) */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) =>{
    if(err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}



app.listen(3002);