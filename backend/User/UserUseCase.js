const User = require("./UserEntity.js");
const fs = require('fs');
const path = require('path');

function getUsers() {
    return ((JSON.parse(fs.readFileSync(path.resolve(__dirname, "./User.json")))).users).map((user) => { return new User(user.username, user.password) });
}

function writeUsers(users) {
    fs.writeFileSync(path.resolve(__dirname, "./User.json"), users);
}

function login(username, password) {
    const user = findUser(username);
    if (user) { return user.authenticate(password) };
    return user;
}

function signup(username, password) {
    const users = getUsers();
    if (!findUser(username)) {
        const new_user = new User(username, password);
        users.push(new_user);
        writeUsers(JSON.stringify({ users }));
    }
}

function findUser(username) {
    const users = getUsers();
    let user;
    users.map((u) => { if (username == u.getUsername()) { user = u }});
    return user;
}

// function addFlight(username, flight) {
//     let user = findUser(username);
//     if (user) { 
//         user.addFlight(flight);
//         return true;
//     } else {
//         return false;
//     }
// }

module.exports = { login, signup };