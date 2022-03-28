const { AirspaceLoader } = require("../../src/Airspace/AirspaceLoader");
const path = require('path');

const filePath = path.resolve(__dirname, '../..', 'resources', 'airspace', 
'canadian_airspace.txt');

const al = new AirspaceLoader(filePath, 'utf-8');
al.getAllAirspacesAsynchronous(res => console.log(res));