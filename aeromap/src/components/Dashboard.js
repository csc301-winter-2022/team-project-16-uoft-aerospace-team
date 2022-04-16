// import * as services from '../backend/controllers/services'
import pageStyle from "../styles/pageStyle";
import { 
    dashFlightsContainerStyle as containerStyle, 
    dashFlightsHeaderStyle as headerStyle,
    dashFlightContentStyle as contentStyle } from "../styles/dashboardStyle";
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Dashboard = (props) => {

    const path = props.path

    const [schedule, setSchedule] = useState([]);
    const [count, setCount] = useState(0);

    // Dashboard will show upcoming flights
    // Make get request for flight data

    // const get_flight_schedule = async () => {
    //     await fetch(`${path}get-flight-schedule`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setSchedule(data);
    //     })
    // }

    // const get_count = async () => {
    //     await fetch(`${path}get-count`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setCount(data.count);
    //     })
    // }
    
    useEffect(() => {
        fetch(`${path}get-flight-schedule`)
        .then(res => res.json())
        .then(data => setSchedule(data));

        fetch(`${path}get-count`)
        .then(res => res.json())
        .then(data => setCount(data.count));
    }, []);

    // fetch(`${path}get-flight-schedule`)
    // .then(res => res.json())
    // .then(data => setCount(data.count));

    // get_flight_schedule();
    // get_count();

    return(
        <div style={pageStyle}>
            <div style={{color:"white"}}> Total flight Count: {count} </div>
            
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2><strong><em>Upcoming Flights</em></strong></h2>
                </div>
                <div className="scrollable" style={contentStyle}>
                    {console.log(typeof(schedule))}
                    {console.log(schedule)}
                    {schedule.map(flight => {
                        return (
                            <div>
                                <div>{flight.date} {flight.sitename}</div>
                                <Link to={`/view-flight/${flight.fid}`}> View Details </Link>
                            </div>                         
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;