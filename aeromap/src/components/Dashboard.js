import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import Header from './widgets/Header';
import InfoBar from './widgets/InfoBar';

import * as service from "../services/service";

import pageStyle from "../styles/Page";
import { 
    containerStyle, 
    headerStyle,
    contentStyle
} from "../styles/Dashboard";

const Dashboard = () => {

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
            
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2>
                        <CountUp end={count} duration={1}/>
                        &nbsp;&nbsp;Upcoming Flight
                    </h2>
                </div>

                <div style={contentStyle}>
                    {schedule.map(flight => (
                        <InfoBar flight={flight}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;