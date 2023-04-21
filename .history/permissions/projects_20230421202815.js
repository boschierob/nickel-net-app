const { ROLE } = require('../data/role');

const fs= require('fs');

let dataUsers = fs.readFileSync('./data.json');
let users = JSON.parse(dataUsers);

function canViewProjects (user, project){
    const oneUser = users.find(wantedUser => wantedUser.name === user.name )
   // console.log(oneUser.role)
    //console.log(ROLE.ADMIN)
    return (user.role === ROLE.ADMIN ||
        project.userName === user.name)
    
}

function scopedProjects(user, projects){
    if(user.role === ROLE.ADMIN) return projects
    return projects.filter(project => project.userName === user.name)
}

module.exports = {
    canViewProjects,
    scopedProjects
}