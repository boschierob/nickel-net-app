const { ROLE } = require('../data/role');

const fs= require('fs');

let dataUsers = fs.readFileSync('./data.json');
let users = JSON.parse(dataUsers);

function canViewProjects (user, project){
    users.find(wantedUser => wantedUser.name === user.name )
    console.log(wantedUser.role)
    console.log(ROLE.ADMIN)
    return (user.role === ROLE.ADMIN)
    /*user.role === ROLE.ADMIN ||
    project.userId === user.id*/
}

module.exports = {
    canViewProjects
}