const ROLE = require('../data/datas');

function canViewProjects (user, project){
    return (
        user.role === ROLE.ADMIN || project.userName === user.name )
}

module.exports = {
    canViewProjects
}