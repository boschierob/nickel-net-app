const fs = require('fs');
let data = fs.readFileSync('data.json');
let users = JSON.parse(data);

function authRole(role) {
    
    return (req, res, next) => {
        //chercher user find par name ... 
        let name = req.body.name
        req.user = users.find(user => user.name === name)
        console.log(req.user)
      if (req.user.role !== role) {
        res.status(401)
        return res.send('Not allowed')
      }
  
      next()
    }
  }

module.exports = { authRole };