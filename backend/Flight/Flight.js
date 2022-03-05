// Message to backend team: import backend files necessary for the following function implementations
// // Add Flight

class Flight {
    constructor(date, sitename, pilot, drone = null, pin = null) {
        this._date = date;
        this._sitename = sitename
        this._pilot = pilot;
        this._drone = drone;
        this._pin = pin;
        this._id += 1
    }

    // getters

    getDate() {
        return this._date;
    }

    getPin() {
        return this._pin;
    }

    getDrone() {
        return this._drone;
    }

    getPilot() {
        return this._pilot;
    }

    getSitename() {
        return this._sitename;
    }
    getID() {
        return this._id;
    }

    // setters
    setPin(pin) {
        this._pin = pin;
    }

    setDrone(drone) {
        this._drone = drone;
    }

    setSitename(sitename) {
        this._sitename = sitename;
    }

    setPilot(pilot) {
        this._pilot = pilot
    }
}

module.exports = Flight;