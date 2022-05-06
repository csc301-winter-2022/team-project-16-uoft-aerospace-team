const Drone = require('../entities/Drone.js')
var uuid = require('uuid');

class DroneManager {
    constructor(drones = []) {
        this.drones = drones;
    }

    get_drones() {
        return this.drones;
    }

    get_drone(droneid) {
        let x = this.drones.findIndex(drone => drone.droneid === droneid);
        if (x === -1) {
            return new Drone()
        }
        else {
            return this.drones[x];
        }
        
    }

    add_drone(name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
        // add ID to drones
        const temp = uuid.v1();
        const new_droneid = temp.slice(0,8)
        this.drones.push(new Drone(new_droneid, name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance))
    }

    edit_drone(droneid, name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
        let x = this.drones.findIndex(drone => drone.droneid === droneid);
        
        if (x === -1) {
            return false
        }
        else {
            this.drones[x] = new Drone(droneid, name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance)
            return true
        }
    }
}

module.exports = DroneManager;