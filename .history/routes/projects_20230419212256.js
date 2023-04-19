const express = require('express')
const jwt = require("jsonwebtoken");

const router = express.Router()

const { projects } = require('../data/projects')
const { canViewProjects } = require('../permissions/projects')

router.get('/', authenticateToken, (req, res) => {
  console.log(projects)
  res.json(projects)
  
})

router.get('/:projectId', setProject,authenticateToken, authGetProject, (req, res) => {
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

function authGetProject(req, res, next) {
  //console.log("dans auth get" + JSON.stringify(req.project.userName) + JSON.stringify(req.user.name)  )
  if(!canViewProjects(req.user, req.project)){
    console.log(canViewProjects(req.user, req.project))
    res.status(401)
    return res.send('Not Allowed')
  }
  next()

}


module.exports = router