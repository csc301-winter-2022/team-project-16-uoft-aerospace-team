class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        // this.flights = [];
    }

    getUsername() {
        return this.username;
    }

    authenticate(password) {
        return password == this.password;
    }

    // addFlight(flight) {
    //     this.flights.push(flight);
    // }

}

module.exports = User;