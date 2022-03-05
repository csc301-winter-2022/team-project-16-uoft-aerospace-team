class Aerodrome { 
    constructor(name, code, status, contact, comm, weather) {
        this.name = name;
        this.code = code;
        this.status = status;
        this.contact = contact;
        this.comm = comm;
        this.weather = weather;
    }
}

module.exports = Aerodrome;