class Drone {
    constructor(droneid, name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
        this.droneid = droneid;
        this.name = name;
        this.MTOW = MTOW;
        this.type = type;
        this.endurance = endurance;
        this.range = range;
        this.tempLimits = tempLimits;
        this.maxAirspeed = maxAirspeed;
        this.pilots = pilots;
        this.buildDate = buildDate;
        this.flightCycles = flightCycles;
        this.lastMaintenance = lastMaintenance;
    }
}

module.exports = Drone;