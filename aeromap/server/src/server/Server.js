const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { AirspaceLoader } = require('../Airspace/AirspaceLoader');
const {List} = require('immutable');
const { Airspace, AirspaceClass } = require('../Airspace/Airspace');
const { Coordinates } = require('../map/Coordinates');
const RequestHandler = require('./RequestHandler');

class Server {
    static airspaceFilePath = path.resolve(__dirname, '../..', 'resources', 'airspace', 
        'CanAirspace291all.txt');
    static maxAltitude = 700; //feet
    airspaces;
    port;

    /**
     * 
     * @param {*} port 
     * @param {Airspace[]} airspaces 
     */
    constructor(port, airspaces) {
        this.port = port;
        this.airspaces = List(airspaces).groupBy(airspace => airspace.airspaceClass);
        this.requestHandler = new RequestHandler();
    }

    /**
     * 
     * @param {*} port 
     * @returns {Promise<Server>}
     */
    static createServer(port) {
        const airspaceLoader = new AirspaceLoader(airspaceFilePath, 'utf-8');
        const loadAirspaces = airspaceLoader.getAllAirspaces().then(airspaces => {
            this.airspaces = airspaces.filter(airspace => 
                airspace.lowAltitude <= Server.maxAltitude);
        });
        return loadAirspaces.then(airspaces => new Server(port, airspaces));
    }


    run() {
        const router = express.Router();

        router.get('/get-flight-schedule', (req, res) => {
            res.send(JSON.stringify(services.get_flight_schedule()));
        });

        router.get('/login', (req, res) => {
            services.login('peter', 'dang');
            res.send(JSON.stringify('success'));
        });

        router.get('/get-logs', (req, res) => {
            res.send(services.get_logs());
        });

        router.get('/get-weather', (req, res) => {
            const date = new Date(Date.parse(req.params.date));
            const location = Coordinates.ofDeg(req.params.lat, req.params.lon);
            this.requestHandler.getWeather(date, location)
                .then(weather => res.status(200).send(JSON.stringify(weather)))
                .catch(err => console.log(err));
        });

        router.get('/get-airspace', (req, res) => {
            const location = Coordinates.ofDeg(req.params.lat, req.params.lon);
            const airspaceClass = this.getAirspaceClass(location);
            res.status(200).send(JSON.stringify(airspaceClass));
        });

        const app = express();
        
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/api', router);

        app.listen(this.port, () => {
            console.log(`Server listening on ${PORT}`);
        });
    }


    getAirspaceClass(location) {
        AirspaceClass.values().forEach(airspaceClass => {
            this.airspaces.get(airspaceClass).forEach(airspace => {
                if (airspace.contains(location)) {
                    return airspaceClass;
                } 
            })
        });
        return AirspaceClass.G;
    }
}

module.exports = Server;