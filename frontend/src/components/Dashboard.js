import * as services from '../backend-2/controllers/services'
import pageStyle from "../styles/pageStyle";
import { 
    dashFlightsContainerStyle as containerStyle, 
    dashFlightsHeaderStyle as headerStyle,
    dashFlightContentStyle as contentStyle } from "../styles/dashboardStyle";
import { nanoid } from 'nanoid';

const Dashboard = () => {

    // Dashboard will show upcoming flights
    // Make get request for flight data

    var schedule = JSON.parse(services.get_flight_schedule());
    console.log(schedule);

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