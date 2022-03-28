const { AirspaceLoader } = require("../../src/Airspace/AirspaceLoader");
const path = require('path');

const filePath = path.resolve(__dirname, '../..', 'resources', 'airspace', 
'canadian_airspace.txt');

const al = new AirspaceLoader(filePath, 'utf-8');
var airspaces;
//al.getAllAirspacesAsynchronous(res => airspaces = res).then();

test('dummy test', () => {
    expect(10).toBe(10);
}); 