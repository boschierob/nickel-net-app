const { ROLE } = require('../data/role');

const fs= require('fs');

let dataUsers = fs.readFileSync('./data.json');
let users = JSON.parse(dataUsers);

function canViewProjects (user, project){
    const oneUser = users.find(wantedUser => wantedUser.name === user.name )
   // console.log(oneUser.role)
    //console.log(ROLE.ADMIN)
    return (user.role === ROLE.ADMIN ||
        project.id === user.id)
    
}

module.exports = {
    canViewProjects
}