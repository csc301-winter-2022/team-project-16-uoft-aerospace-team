const services = require('./controllers/services.js');

const express = require('express');
const router = express.Router();

router.get('/get-flight-schedule', (req, res) => {
    res.send(JSON.stringify(services.get_flight_schedule()));
})

router.get('/login', (req, res) => {
    services.login('peter', 'dang');
    res.send(JSON.stringify('success'));
})

router.get('/get-logs', (req, res) => {
    res.send(services.get_logs());
})

module.exports = router;