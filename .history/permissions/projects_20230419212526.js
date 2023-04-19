const ROLE = require('../data/role');

function canViewProjects (user, project){
    return (
         project.userName === user.name )
}

module.exports = {
    canViewProjects
}