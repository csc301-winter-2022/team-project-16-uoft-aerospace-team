class Flight {
    constructor(fid, date, sitename, pilot, drone, notes) {
        this.fid = fid;
        this.date = date;
        this.sitename = sitename;
        this.pilot = pilot;
        this.drone = drone;
        this.notes = notes;
    }
}

module.exports = Flight;