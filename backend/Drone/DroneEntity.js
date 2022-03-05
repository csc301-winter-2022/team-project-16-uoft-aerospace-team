class Drone {
    constructor(name, droneid, type = null, mass = null) {
        this._name = name;
        this._droneid = droneid;
        this._type = type;
        this._mass = mass;
        this._numFlights = 0
    }

    // getters
    getName() {
        return this._name;
    }

    getID() {
        return this._droneid;
    }

    getType() {
        return this._type
    }

    getMass() {
        return this._mass
    }

    getNumFlights() {
        return this._numFlights
    }

    // setters
    setName(newName) {
        this._name = newName;
    }

    setID(droneID) {
        this._droneid = droneID;
    }

    setType(type) {
        this._type = type;
    }

    setMass(newMass) {
        this._mass = newMass;
    }

    setNumFlights(numFlights) {
        this._numFlights = numFlights;
    }
}
