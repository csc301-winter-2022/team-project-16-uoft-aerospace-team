const Log = require("./LogEntity.js");
const DBHelper = require("../Database/DBHelper.js");


function getLogs() {
    const logsString = DBHelper.read("Log.json");
    return logsString.map((log) => { return new Log(log.droneID, log.pilots, log.notes) });
}

function saveLogs(logs) {
    DBHelper.write("Log.json", logs);
}

function createLog(droneID, pilots, notes) {
    const logs = getLogs();
    const newLog = new Log(droneID, pilots, notes);
    logs.push(newLog);
    saveLogs(logs);
}

function findLog(logID) {
    const logs = getLogs();
    const log = logs.filter(l => logID === l.getID());
    return log[0];
}

module.exports = { getLogs };