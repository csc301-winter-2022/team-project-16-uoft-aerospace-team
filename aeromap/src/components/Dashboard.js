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
    
    useEffect(() => {
        fetch(`${path}get-flight-schedule`)
        .then(res => res.json())
        .then(data => setSchedule(data));

        fetch(`${path}get-count`)
        .then(res => res.json())
        .then(data => setCount(data.count));
    }, []);

    return(
        <div style={pageStyle}>
            <div style={{color:"white"}}> Total flight Count: {count} </div>
            
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2><strong><em>Upcoming Flights</em></strong></h2>
                </div>
                <div className="scrollable" style={contentStyle}>
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