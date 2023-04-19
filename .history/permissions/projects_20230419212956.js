const ROLE = require('../data/role');

function canViewProjects (user, project){
    if(user.role === ROLE.ADMIN) return true;
    if (project.userName === user.name )return true;
       
}

module.exports = {
    canViewProjects
}