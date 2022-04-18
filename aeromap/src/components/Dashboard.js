import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Header from './widgets/Header';

import * as service from "../services/service";

import pageStyle from "../styles/pageStyle";
import { 
    dashFlightsContainerStyle as containerStyle, 
    dashFlightsHeaderStyle as headerStyle,
    dashFlightContentStyle as contentStyle } from "../styles/dashboardStyle";


const Dashboard = (props) => {

    const path = props.path

    const [schedule, setSchedule] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        service
        .get_flight_schedule()
        .then(data => setSchedule(data));

        service
        .get_count()
        .then(data => setCount(data.count));
    }, []);

    return(
        <div style={pageStyle}>
            <Header text='Home' />

            <div style={{color:"white"}}> Total flight Count: <CountUp end={count} duration={1}/> </div>
            
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2><strong>Upcoming Flights</strong></h2>
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