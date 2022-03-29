const services = require('./controllers/services.js');

const express = require('express');
const router = express.Router();

router.get('/get-flight-schedule', (req, res) => {
    res.json(services.get_flight_schedule());
})

router.get('/login', (req, res) => {
    services.login('peter', 'dang');
    res.json('success');
})

router.get('/get-logs', (req, res) => {
    res.json(services.get_logs());
})

router.get('/get-sites', (req, res) => {
    res.send(JSON.stringify(services.get_sites()));
})

router.get('/get-site:sitename', (req, res) => {
    res.send(services.get_site(req.params.sitename));
})

router.post('/create-site', (req, res) => {
    let sitename = req.body.sitename;
    let pins = req.body.pins;
    let margin = req.body.margin;
    services.create_site(sitename, pins, margin);
    res.send('success');
})

router.post('/create-flight', (req, res) => {
    let date = req.body.date;
    let sitename = req.body.sitename;
    let pilot = req.body.pilot;
    let drone = req.body.drone;
    let notes = req.body.notes;
    services.create_flight(date, sitename, pilot, drone, notes);
    res.send('success');
})

module.exports = router;