const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { AirspaceLoader } = require('../Airspace/AirspaceLoader');
const {List} = require('immutable');
const { Airspace, AirspaceClass } = require('../Airspace/Airspace');
const { Coordinates } = require('../map/Coordinates');
const WeatherDataLoader = require('../weather/WeatherDataLoader');
const services = require('./services');

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
    }

    /**
     * Asynchronously create a server listening to the provided port.
     * The result is a Promise<Server>.
     * @param {*} port 
     * @returns {Promise<Server>}
     */
    static createServer(port) {
        const airspaceLoader = new AirspaceLoader(Server.airspaceFilePath, 'utf-8');
        const loadAirspaces = airspaceLoader.getAllAirspaces().then(airspaces => {
            return airspaces.filter(airspace => 
                airspace.lowAltitude <= Server.maxAltitude);
        });
        return loadAirspaces.then(airspaces => new Server(port, airspaces));
    }


    /**
     * Run the server
     */
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
            res.send(JSON.stringify(services.get_logs()));
        });
        
        router.get('/get-sites', (req, res) => {
            res.send(JSON.stringify(services.get_sites()));
        });
        
        router.get('/get-site:sitename', (req, res) => {
            res.send(services.get_site(req.params.sitename));
        });
        
        router.post('/create-site', (req, res) => {
            let sitename = req.body.sitename;
            let pins = req.body.pins;
            let margin = req.body.margin;
            services.create_site(sitename, pins, margin);
            res.send('success');
        });
        
        router.post('/create-flight', (req, res) => {
            let date = req.body.date;
            let sitename = req.body.sitename;
            let pilot = req.body.pilot;
            let drone = req.body.drone;
            let notes = req.body.notes;
            services.create_flight(date, sitename, pilot, drone, notes);
            res.send('success');
        });


        router.get('/weather', (req, res) => {
            const date = new Date(Date.parse(req.query.date));
            const lat = parseFloat(req.query.lat);
            const lon = parseFloat(req.query.lon);

            const location = Coordinates.ofDeg(lat, lon);
            this.requestHandler.getWeather(date, location)
                .then(weather => res.status(200).send(JSON.stringify(weather)))
                .catch(err => console.log(err));
        });

        router.get('/airspace-class', (req, res) => {
            const lat = parseFloat(req.query.lat);
            const lon = parseFloat(req.query.lon);
            const location = Coordinates.ofDeg(lat, lon);
            const airspaceClass = this.getAirspaceClass(location)
            res.status(200).send(airspaceClass);
        });
        
        const app = express();
        
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/api', router);

        app.listen(this.port, () => {
            console.log(`Server listening on ${this.port}`);
        });
    }


    /**
     * Return the airspace class of the area in which the provided
     * location lies
     * @param {*} location 
     * @returns 
     */
    getAirspaceClass(location) {
        AirspaceClass.values().forEach(airspaceClass => {
            this.airspaces.get(airspaceClass, List()).forEach(airspace => {
                if (airspace.contains(location)) {
                    // We return th first hit
                    // It will be the most restricted airspace class
                    // since we iter over AirspaceClass.values()
                    return airspaceClass;           

                } 
            })
        });
        return AirspaceClass.G;
    }

    getWeather(date, location) {
        const loader = WeatherDataLoader.withDefaultAppid(location);
        return loader.maxTempWind(date);
    }

}

module.exports = Server;