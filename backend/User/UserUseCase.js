const User = require("./UserEntity.js");

let users = [];

function login(username, password) {
    const user = findUser(username);
    if (user) { return user.authenticate(password) };
    return user;
}

function signup(username, password) {
    const new_user = new User(username, password);
    users.push(new_user);
}

function findUser(username) {
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