import Moment from "moment";

const path = 'http://localhost:3001/api/'

const initialize_backend = () => {
    fetch(`${path}login`)
}

const get_sites = async () => {
    const res = await fetch(`${path}get-sites`);
    return await res.json();
}

const get_drones = async () => {
    const res = await fetch(`${path}get-drones`);
    return await res.json();
}

const get_logs = async () => {
    const res = await fetch(`${path}get-logs`);
    return await res.json();
}

const get_flight_schedule = async () => {
    const res = await fetch(`${path}get-flight-schedule`);
    return await res.json();
}

const get_count = async () => {
    const res = await fetch(`${path}get-count`);
    return await res.json();
}

const create_flight = async (time, site, pilots, drone, notes) => {
    const response = await fetch(`${path}create-flight`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: Moment(time).format('YYYY-MM-DD ha'),
            sitename: site,
            pilot: pilots,
            drone: drone,
            notes: notes
        })
    });
    return await response.text();
}

export {
    initialize_backend,
    get_logs, get_sites, get_drones,
    get_flight_schedule, get_count,
    create_flight
}