// Message to backend team: import backend files necessary for the following function implementations
// // Add Flight

class Flight {
    constructor(date, sitename, pilot) {
        this.date = date;
        this.sitename = sitename
        this.pilot = pilot;
        this.drone = null;
        this.pin = null;
    }

    // getters

    getDate() {
        return this.date;
    }

    getPin() {
        return this.pin;
    }

    getDrone() {
        return this.drone;
    }

    getPilot() {
        return this.pilot;
    }

    getSitename() {
        return this.sitename;
    }

    // setters
    setPin(pin) {
        this.pin = pin;
    }

    setDrone(drone) {
        this.drone = drone;
    }

    setSitename(sitename) {
        this.sitename = sitename;
    }

    setPilot(pilot) {
        this.pilot = pilot
    }
}

module.exports = Flight;