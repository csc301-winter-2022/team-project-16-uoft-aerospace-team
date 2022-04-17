const Drone = require('../entities/Drone.js')

class DroneManager {
    constructor(drones = []) {
        this.drones = drones;
    }

    get_drones() {
        return this.drones;
    }

    get_drone(dronename) {
        return this.drones.find(drone => drone.name === dronename);
    }

    add_drone(name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
        
        let x = this.drones.findIndex(drone => drone.name === dronename);

        if (x === -1) {
            this.drones.push(new Drone(name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance));
        }
        else {
            this.drones[x].update_info(MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance)
        }
    }
}

module.exports = DroneManager;