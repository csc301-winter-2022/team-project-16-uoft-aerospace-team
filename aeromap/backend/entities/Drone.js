class Drone {
    constructor(name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
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

    update_info(MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
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