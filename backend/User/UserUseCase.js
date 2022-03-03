const User = require("./UserEntity.js");

let users = [];

function login(username, password) {
    // check if username and password are correct
    let login = false;
    users.map((user) => { if (username == user.getUsername()) { login = user.authenticate(password) }});
    return login;
}

function signup(username, password) {
    // make a new user and then
    const new_user = new User(username, password);
    users.push(new_user);
}

module.exports = { login, signup };