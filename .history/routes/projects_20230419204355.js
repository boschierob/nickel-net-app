const express = require('express')
const router = express.Router()
const { projects } = require('../data')
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
  res.json(projects)
})

router.get('/:projectId', setProject, (req, res) => {
  res.json(req.project)
})

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId)
  req.project = projects.find(project => project.id === projectId)
  
  if (req.project == null) {
    res.status(404)
    return res.send('Project not found')
  }
  next()
}

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


module.exports = router