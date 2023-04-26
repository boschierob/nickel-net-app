const express = require('express')
const jwt = require("jsonwebtoken");

const router = express.Router()

const { projects } = require('../data/projects')
const {Intervention} = require('../models/intervention');
const { canViewProjects, scopedProjects } = require('../permissions/projects')

router.get('/', authenticateToken, (req, res) => {
  console.log(projects)
  res.json(scopedProjects(req.user, projects))
})

router.get('/:projectId', setProject,authenticateToken, authGetProject, (req, res) => {
  res.json(req.project)
})

router.get('/interventions/:interventionId/project', (req, res) => {
  const interventionId = req.params.interventionId;

  Intervention.findOne({ _id: interventionId })
    .populate('project')
    .exec((err, intervention) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!intervention) {
        res.status(404).json({ message: 'Intervention not found' });
      } else {
        res.json(intervention.project);
      }
    });
});

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
  console.log(canViewProjects(req.user, req.project))
  //console.log("dans auth get" + JSON.stringify(req.project.userName) + JSON.stringify(req.user.name)  )
  if(!canViewProjects(req.user, req.project)){
    res.status(401)
    return res.send('Not Allowed')
  }
  next()

}



module.exports = router