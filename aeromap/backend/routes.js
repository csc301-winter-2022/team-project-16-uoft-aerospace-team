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

router.get('/login', (req, res) => {
    appController.login('peter', 'dang');
    res.json('success');
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

module.exports = router;