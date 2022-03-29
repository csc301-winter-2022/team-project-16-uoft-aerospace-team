const { Coordinates } = require('../../src/map/Coordinates');
const Server = require('../../src/server/Server');
const axios = require('axios');
const { AirspaceClass } = require('../../src/Airspace/Airspace');

const client = axios.create();
const port = 3989;

beforeAll(async () => {
    await Server.createServer(port)
        .then(server => server.run());
    return;
});

test('Can get airspace class', async () => {

    const location = Coordinates.ofDeg(-43.651070, -79.347015);
    const url = new URL('http://localhost:' + port);
    url.pathname = '/api/airspace-class';
    url.searchParams.append('lat', location.lat.toString());
    url.searchParams.append('lon', location.lon.toString());

    const acceptedValues = AirspaceClass.values();
    await client.get(url.toString())
        .then(res => {
            expect(res.status).toBe(200);       // Hardcoded value to change
            return res.data;
        }).then(data => {
            const received = AirspaceClass.parse(data.letter);
            expect(acceptedValues.includes(received)).toBeTruthy();
        }).catch(err => console.log(err));
    return;
});


/*test('Can get weather', async () => {
    const location = Coordinates.ofDeg(-43.651070, -79.347015);
    const url = new URL('http://localhost:' + port);
    url.pathname = '/api/weather';
    const date = new Date();
    url.searchParams.append('lat', location.lat.toString());
    url.searchParams.append('lon', location.lon.toString());
    url.searchParams.append('date', date.toISOString());

    await client.get(url.toString()).then(res => {
        expect(res.status).toBe(200);
        return res.data;
    }).then(weather => {
        expect(weather.windSpeed).toBeDefined();
        expect(weather.windSpeed).toBeGreaterThanOrEqual(0.0);
        expect(weather.maxTemp).toBeDefined();
        expect(weather.maxTemp).toBeGreaterThan(-50);
        expect(weather.maxTemp).toBeLessThan(50);
    }).catch(err => console.log(err));
    return;
});*/





