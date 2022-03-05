const fs = require("fs");
const path = require("path");

function read(file) {
    const pathName = path.resolve(__dirname, "./" + file);
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, JSON.stringify({ "data": [] }));
    }
    return (JSON.parse(fs.readFileSync(pathName))).data;
}

function write(file, data) {
    fs.writeFileSync(path.resolve(__dirname, "./" + file), JSON.stringify({ data }));
}

module.exports = { read, write };