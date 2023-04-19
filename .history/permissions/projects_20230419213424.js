const ROLE = require('./data/role');

function canViewProjects (user, project){
    console.log(user.role)
    console.log(ROLE)
    return (user.role === ROLE.ADMIN)
       
}

module.exports = {
    canViewProjects
}