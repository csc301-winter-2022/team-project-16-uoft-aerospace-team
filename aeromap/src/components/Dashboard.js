// import * as services from '../backend/controllers/services'
import pageStyle from "../styles/pageStyle";
import { 
    dashFlightsContainerStyle as containerStyle, 
    dashFlightsHeaderStyle as headerStyle,
    dashFlightContentStyle as contentStyle } from "../styles/dashboardStyle";
import { nanoid } from 'nanoid';
import React, {useState} from 'react';


const Dashboard = (props) => {

    const path = props.path

    console.log(`${path}get-flight-schedule`)

    const [schedule, setSchedule] = useState([]);

    // Dashboard will show upcoming flights
    // Make get request for flight data

    const get_flight_schedule = async () => {
        await fetch(`${path}get-flight-schedule`)
        .then(res => res.json())
        .then(data => {
            setSchedule(JSON.parse(data));
        })
    }

    get_flight_schedule();

    return(
        <div style={pageStyle}>
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2><strong><em>Upcoming Flights</em></strong></h2>
                </div>
                <div className="scrollable" style={contentStyle}>
                    {schedule.map(flight => {
                        return (
                            <div key={nanoid()}>
                                <button id="flight_button" type="button">
                                <p>{flight.date} {flight.sitename}</p>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;