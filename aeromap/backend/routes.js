const AppController = require('./controllers/AppController.js');
const appController = new AppController();

const express = require('express');
const router = express.Router();

router.get('/get-flight-schedule', (req, res) => {
    res.json(appController.get_flight_schedule());
})

router.get('/get-flight/:fid', (req, res) => {
    res.json(appController.get_flight(req.params.fid));
})

router.get('/get-logs', (req, res) => {
    res.json(appController.get_logs());
})

router.get('/get-sites', (req, res) => {
    res.json(appController.get_sites());
})

router.get('/get-site/:sitename', (req, res) => {
    res.json(appController.get_site(req.params.sitename));
})

router.get('/get-aerodromes/:lat/:lng', (req, res) => {
    res.json(appController.get_nearby_aerodromes([{lat:req.params.lat, lng:req.params.lng}]));
})

router.get('/get-airspace/:lat/:lng', (req, res) => {
    res.json(appController.get_airspace([{ lat: req.params.lat, lng: req.params.lng }]));
})

router.get('/get-count', (req, res) => {
    res.json({count: appController.get_count()});
})

router.post('/create-site', (req, res) => {
    let sitename = req.body.sitename;
    let pins = req.body.pins;
    let margin = req.body.margin;
    appController.create_site(sitename, pins, margin);
    res.send('success');
})

router.post('/create-flight', (req, res) => {
    let date = req.body.date;
    let sitename = req.body.sitename;
    let pilot = req.body.pilot;
    let drone = req.body.drone;
    let notes = req.body.notes;
    appController.create_flight(date, sitename, pilot, drone, notes);
    res.send('success');
})

router.post('/create-drone', (req, res) => {
    let name = req.body.name
    let MTOW = req.body.MTOW
    let type = req.body.type
    let endurance = req.body.endurance
    let range = req.body.range
    let tempLimits = req.body.tempLimits
    let maxAirspeed = req.body.maxAirspeed
    let pilots = req.body.pilots
    let buildDate = req.body.buildDate
    let flightCycles = req.body.flightCycles
    let lastMaintenance = req.body.lastMaintenance

    appController.create_drone(name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance);
    res.send('success');
})

router.post('/edit-drone', (req, res) => {
    let droneid = req.body.droneid
    let name = req.body.name
    let MTOW = req.body.MTOW
    let type = req.body.type
    let endurance = req.body.endurance
    let range = req.body.range
    let tempLimits = req.body.tempLimits
    let maxAirspeed = req.body.maxAirspeed
    let pilots = req.body.pilots
    let buildDate = req.body.buildDate
    let flightCycles = req.body.flightCycles
    let lastMaintenance = req.body.lastMaintenance

    let val = appController.edit_drone(droneid, name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance);
    
    if (val) {
        res.send('success');
    }
    else {
        res.send('drone not found')
    }
    
})

router.get('/get-drones', (req, res) => {
    res.json(appController.get_drones());
})

router.get('/get-drone/:droneid', (req, res) => {
    res.json(appController.get_drone(req.params.droneid));
})

module.exports = router;