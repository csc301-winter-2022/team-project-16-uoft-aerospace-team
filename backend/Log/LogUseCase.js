const Log = require("./LogEntity.js");
const fs = require("fs");
const path = require("path");

function getLogs() {
    const pathName = path.resolve(__dirname, "./Log.json");
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, JSON.stringify({ "logs": [] }));
    }
    return ((JSON.parse(fs.readFileSync(pathName))).logs).map((log) => { return new Log(log.droneID, log.pilots, log.notes) });
}

function writeLogs(logs) {
    fs.writeFileSync(path.resolve(__dirname, "./Log.json"), logs);
}

function createLog(droneID, pilots, notes) {
    const logs = getLogs();
    const newLog = new Log(droneID, pilots, notes);
    logs.push(newLog);
    writeLogs(logs);
}

function findLog(logID) {
    const logs = getLogs();
    const log = logs.filter(l => logID === l.getID());
    return log[0];
}