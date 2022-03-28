let logID = 0;

class Log {
    constructor(droneID, pilots, notes) {
        this.logID = logID;
        logID++;
        this.droneID = droneID;
        this.pilots = pilots;
        this.notes = notes;
    }

    getID() {
        return this.logID;
    }

    getDroneID() {
        return this.droneID;
    }

    getPilots() {
        return this.pilots;
    }

    getNotes() {
        return this.notes;
    }

    addPilot() {
        
    }

    removePilot() {

    }

    addNotes() {

    }

    removeNotes() {

    }
}

module.exports = Log