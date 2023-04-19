const { ROLE } = require('../data/role');
let dataUsers = fs.readFileSync('data.json');
users = JSON.parse(dataUsers);

function canViewProjects (user, project){
    console.log(user.name)
    console.log(ROLE.ADMIN)
    return (user.role === ROLE.ADMIN)
    /*user.role === ROLE.ADMIN ||
    project.userId === user.id*/
}

module.exports = {
    canViewProjects
}