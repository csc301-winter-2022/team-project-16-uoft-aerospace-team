const axios = require('axios');
const { AirspaceClass } = require('../../src/Airspace/Airspace');
const { Coordinates } = require('../../src/map/Coordinates');

//axios.get('http://localhost:3988/api/airspace-class?lat=39.8&lon=29.03')
  //  .then(res => console.log(res.data));

const date = new Date();

//axios.get('http://localhost:3988/api/weather?date=' + date.toISOString() + '&lat=39.8&lon=29.03')
  //  .then(res => console.log(res.data));

const port = 3988;
const client = axios.create();
const location = Coordinates.ofDeg(43.651070, -79.347015);
const url = new URL('http://localhost:' + port);
url.pathname = '/api/airspace-class';
url.searchParams.append('lat', location.lat.toString());
url.searchParams.append('lon', location.lon.toString());

const acceptedValues = AirspaceClass.values();
client.get(url.toString())
    .then(res => {
       // expect(res.statusCode.toBe(200));
       //console.log(JSON.parse(res));
        return res.data;
    }).then(data => {
        const received = AirspaceClass.parse(data.letter);
        console.log(received);
        console.log(acceptedValues.includes(received));
    });

function getW() {
    const location = Coordinates.ofDeg(43.651070, -79.347015);
    const url = new URL('http://localhost:' + port);
    url.pathname = '/api/weather';
    const date = new Date();
    url.searchParams.append('lat', location.lat.toString());
    url.searchParams.append('lon', location.lon.toString());
    url.searchParams.append('date', date.toISOString());

    client.get(url.toString()).then(res => {
        return res.data;
    }).then(weather => {
        console.log(weather);
    });
}
getW();