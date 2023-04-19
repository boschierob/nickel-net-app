const ROLE = require('../data/role');

function canViewProjects (user, project){
    return (
        user.role === ROLE.ADMIN || project.userName === user.name )
}

module.exports = {
    canViewProjects
}