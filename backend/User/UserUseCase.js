const User = require("./UserEntity.js");
const DBHelper = require("../Database/DBHelper.js");


function getUsers() {
    const usersString = DBHelper.read("User.json");
    return usersString.map((user) => { return new User(user.username, user.password) });
}

function saveUsers(users) {
    DBHelper.write("User.json", users);
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
        saveUsers(users);
    }
}

function findUser(username) {
    const users = getUsers();
    const user = users.filter(u => username === u.getUsername());
    return user[0];
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