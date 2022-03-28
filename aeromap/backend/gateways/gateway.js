const fs = require("fs");
const path = require("path");


/**
 * 
 * @param {string} file json database file for a class 
 * @returns {Array} returns JSON array of class objects read from file
 */
function read(file) {
    const pathName = path.resolve(__dirname, "../database/" + file);
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, JSON.stringify({ "data": {} }));
    }
    return (JSON.parse(fs.readFileSync(pathName))).data;
}

/**
 * 
 * @param {string} file json database file for a class
 * @param {Array} data array of objects to be written to file 
 */
function write(file, data) {
    fs.writeFileSync(path.resolve(__dirname, "../database/" + file), JSON.stringify({ "data": data }));
}


module.exports = { read, write };