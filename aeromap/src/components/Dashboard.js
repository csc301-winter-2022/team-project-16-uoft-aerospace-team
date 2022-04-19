import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import CountUp from 'react-countup';
import Header from './widgets/Header';
import FlightInfoBar from './widgets/FlightInfoBar';

import * as service from "../services/service";

import pageStyle from "../styles/Page";
import { 
    containerStyle, 
    headerStyle,
    contentStyle
} from "../styles/Dashboard";

const Dashboard = () => {

    const [flights, setFlights] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        service
        .get_flight_schedule()
        .then(data => setFlights(data));

        service
        .get_count()
        .then(data => setCount(data.count));
    }, []);

    const handleRemoveFlight = index => () => {
        const newFlights = flights.slice(0, index).concat(flights.slice(index + 1, flights.length))
        setFlights(newFlights)
    }

    return(
        <div style={pageStyle}>
            <Header text='Home' />
            
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2>
                        <CountUp end={count} duration={1}/>
                        &nbsp;&nbsp;Upcoming Flight
                    </h2>
                </div>

                <div style={contentStyle}>
                    {flights.map((flight, index) => (
                        <FlightInfoBar key={nanoid()} flight={flight} handleRemove={handleRemoveFlight(index)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;