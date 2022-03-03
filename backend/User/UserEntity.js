class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    authenticate(password) {
        return password == this.password;
    }
}

module.exports = User;